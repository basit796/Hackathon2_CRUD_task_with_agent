# Data Model: Bonus Features - Multi-Language Support (Urdu) + Voice Commands

**Feature**: 001-bonus-features  
**Date**: 2026-02-07  
**Status**: Completed

---

## Overview

This document describes the data model for the bonus features. Notably, **no database schema changes were required** - both features work with existing data structures.

---

## Existing Data Model (Unchanged)

### User Entity
Already defined in main application - no changes needed.

```python
class User(SQLModel, table=True):
    __tablename__ = "users"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    tasks: List["Task"] = Relationship(back_populates="user")
```

**Impact of Bonus Features**: None - User model unchanged

---

### Task Entity
Already defined in main application - supports both languages without modifications.

```python
class Task(SQLModel, table=True):
    __tablename__ = "tasks"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    description: Optional[str] = None
    completed: bool = Field(default=False)
    deadline: Optional[datetime] = None
    recurrence: Optional[str] = None  # "daily", "weekly", "monthly", "every_monday", etc.
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: int = Field(foreign_key="users.id")
    
    # Relationships
    user: User = Relationship(back_populates="tasks")
```

**Impact of Bonus Features**:
- ✅ `title` and `description` fields support Urdu text (PostgreSQL UTF-8 compatible)
- ✅ `recurrence` parameter works with both English and Urdu commands
- ✅ No schema changes required

**Example Urdu Task**:
```json
{
  "id": 42,
  "title": "گروسری خریدنا",
  "description": "دودھ، انڈے، روٹی خریدنا ہے",
  "completed": false,
  "deadline": "2026-02-08T14:00:00",
  "recurrence": "weekly",
  "user_id": 1
}
```

---

## Runtime Data Structures (Transient)

### Message Entity (Frontend State)
Represents chat messages in the UI - not persisted to database.

```typescript
interface Message {
  role: 'user' | 'agent';
  content: string;           // Supports both English and Urdu (Unicode)
  timestamp: Date;
}
```

**Language Handling**:
- `content` can contain English, Urdu, or mixed text
- Language detection happens at AI agent level
- Browser automatically handles RTL rendering for Urdu

**Voice Input Integration**:
- Voice transcription populates `content` field
- Same structure whether typed or spoken
- No additional fields needed for voice metadata

**Example English Message**:
```typescript
{
  role: 'user',
  content: 'Create a task for tomorrow',
  timestamp: new Date('2026-02-07T14:30:00Z')
}
```

**Example Urdu Message**:
```typescript
{
  role: 'user',
  content: 'کل کے لیے ایک کام بنائیں',
  timestamp: new Date('2026-02-07T14:30:00Z')
}
```

**Example Voice Transcribed Message**:
```typescript
{
  role: 'user',
  content: 'Buy groceries tomorrow at 2pm',  // Transcribed from speech
  timestamp: new Date('2026-02-07T14:30:00Z')
}
```

---

### Voice Recognition State (Frontend Component State)
Managed in React component state - not persisted.

```typescript
// Component state hooks
const [isListening, setIsListening] = useState<boolean>(false);
const [voiceSupported, setVoiceSupported] = useState<boolean>(false);
const recognitionRef = useRef<SpeechRecognition | null>(null);
```

**State Variables**:
- `isListening`: Boolean indicating active recording
- `voiceSupported`: Boolean indicating browser capability
- `recognitionRef`: Reference to SpeechRecognition instance

**State Transitions**:
```
Idle (voiceSupported=true) 
  → User clicks Mic button
  → Listening (isListening=true) 
  → User speaks
  → Browser processes speech
  → Transcribed (isListening=false, input field populated)
  → User sends message
  → Back to Idle
```

**Error States**:
- `voiceSupported=false`: Browser doesn't support Web Speech API
- Permission denied: Show error message, remain in Idle state
- Recognition error: Return to Idle state, show error to user

---

### Conversation History (Backend In-Memory)
Stored in memory per user session - not persisted to database.

```python
# In backend/src/agent.py
user_conversations: Dict[str, List[Dict[str, str]]] = {}

# Structure:
{
  "user_123": [
    {"role": "user", "content": "Create a task"},
    {"role": "agent", "content": "I'll help you create a task. What should it be?"},
    {"role": "user", "content": "Buy groceries"},
    {"role": "agent", "content": "Task created successfully!"}
  ],
  "user_456": [
    {"role": "user", "content": "میرے کام دکھائیں"},
    {"role": "agent", "content": "آپ کے پاس 3 کام ہیں..."}
  ]
}
```

**Language Handling**:
- Each message contains text in user's chosen language
- No language metadata stored (detected on-the-fly)
- Mixed language conversations supported in same history

**Lifecycle**:
- Created on first message from user
- Maintained during session
- Can be cleared via "Clear History" button
- Not persisted (resets on server restart)

---

## Data Flow Diagrams

### Flow 1: English Text Message
```
User types "Create task" 
  → Frontend: Message { role: 'user', content: 'Create task' }
  → API: POST /api/chat { message: 'Create task', user_id: 123 }
  → Backend: Add to conversation history
  → Gemini AI: Detects English, generates English response
  → Backend: Execute create_task tool
  → Database: INSERT INTO tasks (title, user_id, ...)
  → API: Response { success: true, response: "Task created!" }
  → Frontend: Message { role: 'agent', content: "Task created!" }
  → UI: Display English response
```

### Flow 2: Urdu Text Message
```
User types "کام بنائیں"
  → Frontend: Message { role: 'user', content: 'کام بنائیں' }
  → API: POST /api/chat { message: 'کام بنائیں', user_id: 123 }
  → Backend: Add to conversation history (Urdu text)
  → Gemini AI: Detects Urdu, generates Urdu response
  → Backend: Execute create_task tool
  → Database: INSERT INTO tasks (title='گروسری', ...)  # Urdu in UTF-8
  → API: Response { success: true, response: "کام بن گیا!" }
  → Frontend: Message { role: 'agent', content: "کام بن گیا!" }
  → UI: Display Urdu response (RTL automatic)
```

### Flow 3: Voice Input (English)
```
User clicks Mic button
  → Frontend: setIsListening(true), recognition.start()
  → Browser: Request microphone permission
  → User: Grants permission, speaks "Create task for tomorrow"
  → Browser: SpeechRecognition processes audio
  → Browser: onresult event → transcript = "Create task for tomorrow"
  → Frontend: setInput("Create task for tomorrow"), setIsListening(false)
  → User: Reviews text, clicks Send
  → [Same flow as English Text Message above]
```

### Flow 4: Voice Input (Urdu)
```
User clicks Mic button
  → Frontend: setIsListening(true), recognition.start()
  → Browser: Request microphone permission
  → User: Grants permission, speaks "کل کا کام بنائیں"
  → Browser: SpeechRecognition processes audio (Urdu model if available)
  → Browser: onresult event → transcript = "کل کا کام بنائیں"
  → Frontend: setInput("کل کا کام بنائیں"), setIsListening(false)
  → User: Reviews/edits text, clicks Send
  → [Same flow as Urdu Text Message above]
```

---

## Data Validation Rules

### Task Title/Description (Urdu Support)
- **Length**: 1-500 characters (both English and Urdu)
- **Encoding**: UTF-8 (supports Urdu Unicode range U+0600 to U+06FF)
- **Required**: Title required, description optional
- **Validation**: No language-specific validation (both languages treated equally)

### Voice Transcription
- **Max Length**: ~300 words (browser limitation)
- **Duration**: No enforced limit (browsers typically ~60 seconds continuous)
- **Editing**: User can modify transcribed text before sending
- **Validation**: Same as text input after transcription

### Conversation History
- **Max Messages**: No hard limit (in-memory, cleared on restart)
- **Size Limit**: No enforced limit (reasonable for chat context)
- **Persistence**: Session-based only (not stored in database)

---

## Data Storage Considerations

### PostgreSQL UTF-8 Support
- ✅ PostgreSQL default encoding is UTF-8
- ✅ Urdu text stored natively without special configuration
- ✅ Queries work with Urdu text (WHERE, LIKE, etc.)
- ✅ Indexing works for Urdu fields

**Example Query**:
```sql
-- Search tasks by Urdu title
SELECT * FROM tasks WHERE title LIKE '%گروسری%' AND user_id = 1;

-- Works correctly with UTF-8 encoding
```

### Session Storage (Frontend)
```typescript
// Save chat history to browser sessionStorage
sessionStorage.setItem('chat_history', JSON.stringify(messages));

// Supports Urdu text in UTF-8
// Example:
[
  { role: 'user', content: 'کام بنائیں', timestamp: '...' },
  { role: 'agent', content: 'کام بن گیا', timestamp: '...' }
]
```

---

## Data Model Decisions

### Decision 1: No Language Field in Task Model
**Decision**: Do not add a `language` field to Task entity

**Rationale**:
- Language is a UI/chat concern, not a task property
- Tasks can be created in Urdu but viewed in English (or vice versa)
- Title/description language is implicit from text content
- Avoids coupling data model to presentation layer

**Alternative Rejected**: Add `language: Optional[str]` field
- Reason: Unnecessary complexity, no real use case

---

### Decision 2: In-Memory Conversation History
**Decision**: Keep conversation history in memory, not database

**Rationale**:
- Chat history is session-specific context
- No long-term persistence requirement
- Reduces database writes
- Simplifies implementation
- User can clear history anytime

**Alternative Rejected**: Persist to `conversation_messages` table
- Reason: Unnecessary persistence, privacy concerns, db overhead

---

### Decision 3: No Voice Metadata Storage
**Decision**: Do not store whether message was typed or spoken

**Rationale**:
- Input method is irrelevant after transcription
- No analytics requirement for voice usage
- Keeps data model simple
- Privacy-preserving (no audio traces)

**Alternative Rejected**: Add `input_method` field to messages
- Reason: No use case, adds complexity

---

### Decision 4: Same CRUD Operations for Both Languages
**Decision**: No separate endpoints or logic for Urdu vs English

**Rationale**:
- Language handled at AI prompt level
- Backend tools language-agnostic
- Database supports both transparently
- Reduces code duplication
- Maintains single source of truth

---

## Entity Relationships

No new entities or relationships introduced. Existing relationships unchanged:

```
User (1) ----< (N) Task
  ↑                 ↑
  |                 |
  └─ Conversation history (in-memory, not persisted)
  └─ Chat messages (frontend state, not persisted)
```

---

## Data Migration

**Required Migrations**: ✅ NONE

**Rationale**:
- Existing UTF-8 database supports Urdu text
- No schema changes needed
- No data transformation required
- Backward compatible (English tasks unaffected)

**Validation**:
```sql
-- Test Urdu insert/select
INSERT INTO tasks (title, description, user_id) 
VALUES ('گروسری خریدنا', 'دودھ اور روٹی', 1);

SELECT * FROM tasks WHERE user_id = 1;
-- Returns Urdu text correctly
```

✅ Works without migrations

---

## Data Model Summary

### Key Points

1. **Zero Schema Changes**: Both features work with existing data model
2. **UTF-8 Native**: PostgreSQL handles Urdu text seamlessly
3. **Transient State**: Voice and language state managed in memory/frontend
4. **Language Agnostic**: Backend logic treats all text equally
5. **Privacy First**: No audio storage, minimal metadata

### Entities Modified
- ✅ None (all existing entities sufficient)

### New Entities Added
- ✅ None (no new persistence requirements)

### Data Integrity
- ✅ Maintained (no changes to constraints or relationships)
- ✅ Urdu text validated at application layer (length, required fields)
- ✅ Voice transcription follows same validation as typed text

---

**Data Model Status**: ✅ COMPLETE - No changes required, existing model supports both features.
