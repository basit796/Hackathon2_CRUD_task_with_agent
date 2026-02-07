# Todo Full-Stack Web Application - Phase II

**Version**: 2.0.0  
**Python Version**: 3.12.4 (EXACT)  
**Node Version**: 18+  
**Phase**: II - Full-Stack Web Application with Authentication

---

## Overview

A complete full-stack todo application with JWT authentication, persistent PostgreSQL storage, and modern web interface. This is Phase II of the 5-phase Evolution of Todo Hackathon, implementing multi-user authentication and database persistence.

### Phase II Features ✅

**Authentication:**
- ✅ User signup with email/password
- ✅ User signin with JWT token
- ✅ Protected routes with token validation
- ✅ Multi-user isolation

**Task Management:**
- ✅ Create tasks with title and description
- ✅ View all tasks with filtering (all/complete/incomplete)
- ✅ Sort tasks (by date, title, status)
- ✅ Search tasks by title/description
- ✅ Update task title/description
- ✅ Toggle task completion status
- ✅ Delete tasks

**Technical:**
- ✅ Persistent PostgreSQL storage (Neon)
- ✅ RESTful API with FastAPI
- ✅ Modern Next.js 14 frontend
- ✅ Responsive Tailwind CSS design
- ✅ JWT authentication
- ✅ Password hashing with bcrypt

### Phase I (Complete) ✅

Phase I implemented a console-only in-memory application. See `/src` for Phase I code.

---

## 🎉 Bonus Features (+300 Points)

### 1. Multi-Language Support - Urdu (+100 Points) ✅

**Features:**
- Automatic language detection (English/Urdu)
- Agent responds in user's language
- Full Urdu task management support
- Recurring tasks in Urdu
- Code-switching support

**Usage:**
```
English: "Show me all my tasks"
Urdu:    "میرے کام دکھائیں"
```

### 2. Voice Commands (+200 Points) ✅

**Features:**
- Web Speech API integration
- Microphone button in chat interface
- Speech-to-text conversion
- Visual feedback (red pulse when listening)
- Works with both English and Urdu

**How to Use:**
1. Click microphone button (🎤) in chat
2. Allow microphone permission
3. Speak your message clearly
4. Text appears automatically
5. Send or edit before sending

**Browser Support:**
- ✅ Chrome (Full support)
- ✅ Edge (Full support)
- ✅ Safari (Full support)
- ⚠️ Firefox (Limited, requires flag)

**Documentation:**
- See `BONUS_FEATURES.md` for details
- See `TESTING_GUIDE.md` for testing
- See `START_TESTING.md` for quick start

---

## Tech Stack

### Backend
- **Python 3.12.4** (FastAPI)
- **SQLModel** (Database ORM)
- **PostgreSQL** (Neon Serverless)
- **JWT** (Authentication)
- **bcrypt** (Password hashing)
- **Alembic** (Database migrations)

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript 5**
- **Tailwind CSS 3**
- **Axios** (HTTP client)

---

## Prerequisites

- **Python 3.12.4** (exact version required)
- **Node.js 18+** and npm
- **PostgreSQL database** (Neon account recommended)
- Terminal/Command prompt access

---

## Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd Hackathon2_CRUD_task_with_agent
```

### 2. Backend Setup

```bash
cd backend
```

Create virtual environment:
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Create `.env` file:
```bash
cp .env.example .env
```

Update `.env` with your database and JWT secret:
```
DATABASE_URL=postgresql://user:pass@host.neon.tech/dbname?sslmode=require
JWT_AUTH=your-secret-key-here-min-32-chars-change-in-production
```

Create database tables:
```bash
python -c "from src.database import create_db_and_tables; create_db_and_tables()"
```

Run the backend server:
```bash
uvicorn src.main:app --reload --port 8000
```

Backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

Verify `.env.local` content:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run the development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

---

## Usage

### 1. Sign Up

- Navigate to `http://localhost:3000/signup`
- Enter your email address
- Enter a password (min 8 characters)
- Confirm your password
- Click "Sign up"

### 2. Sign In

- Navigate to `http://localhost:3000/signin`
- Enter your email and password
- Click "Sign in"

### 3. Manage Tasks

Once signed in, you'll be redirected to the tasks page where you can:

**Create Task:**
- Click the "+ New Task" button
- Enter task title (required)
- Enter task description (optional)
- Click "Create Task"

**View Tasks:**
- All your tasks are displayed in a list
- Use filters to show: All, Complete, or Incomplete tasks
- Use sort options: Newest/Oldest First, Title A-Z/Z-A, Status
- Use search to find tasks by title or description

**Update Task:**
- Click the "Edit" button on any task
- Modify the title and/or description
- Click "Update Task"

**Toggle Completion:**
- Click the checkbox next to any task to mark it complete/incomplete

**Delete Task:**
- Click the "Delete" button on any task
- Confirm the deletion

### 4. Sign Out

- Click the "Logout" button in the top right corner

---

## API Endpoints

### Authentication (Public)
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login and get JWT token

### Tasks (Protected - Requires JWT Token)
- `GET /api/users/{user_id}/tasks` - List tasks with filters/sort/search
- `POST /api/users/{user_id}/tasks` - Create task
- `GET /api/users/{user_id}/tasks/{task_id}` - Get task details
- `PUT /api/users/{user_id}/tasks/{task_id}` - Update task
- `DELETE /api/users/{user_id}/tasks/{task_id}` - Delete task
- `PATCH /api/users/{user_id}/tasks/{task_id}/complete` - Toggle completion

See `specs/main/contracts/rest-api.md` for detailed API documentation.

---

## Project Structure

```
.
├── backend/               # FastAPI backend
│   ├── src/
│   │   ├── models/       # SQLModel database models (User, Task)
│   │   ├── routes/       # API endpoints (auth, tasks)
│   │   ├── middleware/   # JWT authentication
│   │   ├── utils/        # Password hashing, JWT utilities
│   │   ├── config.py     # Configuration (DATABASE_URL, JWT_AUTH)
│   │   ├── database.py   # Database connection
│   │   └── main.py       # FastAPI application entry point
│   ├── requirements.txt  # Python dependencies
│   ├── .env.example      # Environment variables template
│   └── .gitignore        # Backend git ignore
│
├── frontend/             # Next.js frontend
│   ├── src/
│   │   ├── app/         # Next.js pages (signup, signin, tasks)
│   │   ├── components/  # React components (TaskList, TaskForm, etc.)
│   │   ├── context/     # Auth context provider
│   │   ├── lib/         # API client, auth utilities
│   │   └── types/       # TypeScript types (User, Task)
│   ├── package.json     # Node dependencies
│   ├── .env.local.example  # Environment variables template
│   └── .gitignore       # Frontend git ignore
│
├── src/                  # Phase I console app (in-memory)
├── specs/                # Specifications
│   └── main/
│       ├── spec-phase2.md
│       ├── data-model-phase2.md
│       ├── plan.md
│       └── contracts/
│           └── rest-api.md
├── README.md             # This file
└── requirements.txt      # Phase I dependencies (optional rich)
```

**Features**:
- Title is required (cannot be empty)
- Description is optional (press Enter to skip)
- Duplicate title detection with confirmation prompt
- Automatic UUID generation

---

### 2. List Tasks

**Command**: `list`

**Description**: Display all tasks in table format with current sort order.

**Example**:
```
todo> list

Tasks (2 total):
┌──────────┬──────────────────────┬─────────────────┬────────┬─────────────────────┐
│ ID       │ Title                │ Description     │ Status │ Created             │
├──────────┼──────────────────────┼─────────────────┼────────┼─────────────────────┤
│ 550e8400 │ Buy groceries        │ Milk and bread  │ ✗      │ 2026-01-01 14:22:13 │
│ 7c9e6679 │ Write documentation  │ Phase I spec    │ ✓      │ 2026-01-01 14:25:30 │
└──────────┴──────────────────────┴─────────────────┴────────┴─────────────────────┘
```

**Status Indicators**:
- ✗ = Incomplete (pending)
- ✓ = Complete

---

### 3. Update Task

**Command**: `update`

**Description**: Update task title and/or description with interactive prompts.

**Example**:
```
todo> update
Enter task ID (or prefix): 550e8400

Current task: Buy groceries
Current description: Milk and bread

Press Enter to keep current value, or type new value:
Update title: Buy groceries and toiletries
Update description: Milk, bread, eggs, shampoo
✓ Task 550e8400 updated successfully
```

**Features**:
- ID prefix matching (use any unique prefix)
- Show current values before updating
- Press Enter to keep existing value
- Validates title is non-empty

---

### 4. Delete Task

**Command**: `delete`

**Description**: Permanently delete a task.

**Example**:
```
todo> delete
Enter task ID (or prefix) to delete: 7c9e6679
✓ Task 7c9e6679 deleted successfully
```

**Warning**: Deletion is immediate and permanent (no undo in Phase I).

---

### 5. Toggle Complete

**Command**: `toggle`

**Description**: Mark task as complete or incomplete.

**Example**:
```
todo> toggle
Enter task ID (or prefix) to toggle: 550e8400
✓ Task 550e8400 marked as complete

todo> toggle
Enter task ID (or prefix) to toggle: 550e8400
✓ Task 550e8400 marked as incomplete
```

---

### 6. Sort

**Command**: `sort`

**Description**: Change the sorting order for task list display.

**Example**:
```
todo> sort

Available sort options:
  A: Insertion order
  B: Creation time (oldest first)
  C: Creation time (newest first)
  D: Incomplete first, then by creation time (current)

Enter sort option (A/B/C/D): C
✓ Sort preference updated to: Creation time (newest first)
```

**Sort Options**:
- **A**: Insertion order (order tasks were added)
- **B**: Oldest first (by creation timestamp)
- **C**: Newest first (by creation timestamp)
- **D**: Incomplete first, then by creation time (DEFAULT)

---

### 7. Help

**Command**: `help`

**Description**: Display all available commands.

**Example**:
```
todo> help

Available Commands:
  add              Add a new task (interactive prompts)
  list             Display all tasks (sorted by current preference)
  update           Update task title/description (interactive prompts)
  delete           Delete a task (interactive prompt)
  toggle           Mark task complete/incomplete (interactive prompt)
  sort             Change task list sorting order
  help             Show this help message
  exit, quit       Exit application

Note: All inputs are provided through interactive prompts (no command-line arguments)
      Task IDs can be shortened to any unique prefix (e.g., first 8 characters)
```

---

### 8. Exit

**Command**: `exit` or `quit`

**Description**: Exit the application (all data is lost).

**Example**:
```
todo> exit

Goodbye! All tasks have been cleared from memory.
```

**Keyboard Shortcuts**:
- `Ctrl+C` - Exit application
- `Ctrl+D` - Exit application (Unix-like systems)

---

## Interactive Prompt Workflow

**Important**: This application uses **NO command-line arguments**. All inputs are collected through interactive prompts.

### Example Workflow

```bash
# Wrong (no arguments accepted)
$ python src/main.py add "Buy groceries"
# This will start the app and ignore arguments

# Correct (interactive)
$ python src/main.py
todo> add
Enter task title: Buy groceries
Enter task description (optional): Milk and bread
✓ Task added successfully!
```

---

## ID Prefix Matching Feature

Task IDs are UUIDs (36 characters), but you can use any unique prefix:

```
# Full ID
todo> delete 550e8400-e29b-41d4-a716-446655440000

# Short prefix (recommended - first 8 characters)
todo> delete 550e8400

# Even shorter prefix (if unique)
todo> delete 550

# Ambiguous prefix error
todo> delete 5
✗ Ambiguous ID: Prefix '5' matches multiple tasks: 550e8400, 5abc1234
```

---

## Duplicate Title Warning Behavior

When adding a task with a duplicate title (case-insensitive):

```
todo> add
Enter task title: Buy groceries
⚠ Warning: A task with title 'Buy groceries' already exists.
Do you want to add it anyway? (y/n): y
✓ Task added successfully!
```

**Note**: Duplicate titles are allowed if you confirm. This is intentional for flexibility.

---

## Sorting Options

### Default (Option D): Incomplete First

Shows incomplete tasks first, then completed tasks, both sorted by creation time.

```
Tasks (4 total):
┌──────────┬──────────────┬─────────┬────────┐
│ ID       │ Title        │ Status  │ Created│
├──────────┼──────────────┼─────────┼────────┤
│ 123abc   │ Task 1       │ ✗       │ 10:00  │  ← Incomplete
│ 456def   │ Task 2       │ ✗       │ 10:05  │  ← Incomplete
│ 789ghi   │ Task 3       │ ✓       │ 09:55  │  ← Complete
│ 012jkl   │ Task 4       │ ✓       │ 10:10  │  ← Complete
└──────────┴──────────────┴─────────┴────────┘
```

### Other Options

- **A (Insertion)**: Order tasks were added to the list
- **B (Oldest First)**: Sorted by creation timestamp (ascending)
- **C (Newest First)**: Sorted by creation timestamp (descending)

---

## Moderate Error Message Format

Error messages follow the format: **Error Type: Reason**

```
✗ Validation Error: Title cannot be empty
✗ Not Found: Task not found: 999
✗ Ambiguous ID: Prefix '5' matches multiple tasks: 550e8400, 5abc1234
```

**No stack traces** are shown to users (Phase I design).

---

## Error Handling Examples

### Empty Title
```
todo> add
Enter task title: 
✗ Validation Error: Title cannot be empty
```

### Task Not Found
```
todo> update
Enter task ID (or prefix): 999999
✗ Not Found: Task not found: 999999
```

### Invalid Command
```
todo> remove
✗ Unknown command: 'remove'. Type 'help' for available commands
```

### Ambiguous ID
```
todo> delete
Enter task ID (or prefix) to delete: 5
✗ Ambiguous ID: Prefix '5' matches multiple tasks: 550e8400, 5abc1234
```

---

## Phase I Scope Clarification

### What's Included ✅
- Core CRUD operations (add, list, update, delete)
- Task completion toggle
- In-memory dictionary storage
- Interactive console interface
- ID prefix matching
- Duplicate title detection
- Sorting options (4 types)
- Moderate error messages

### What's NOT Included ❌
- Persistent storage (data lost on exit)
- Database integration
- Web interface or API
- Task categories or tags
- Task priorities
- Due dates
- Task filtering or search
- User accounts
- AI features
- Multi-user support

**These features will be added in Phases II-V.**

---

## Project Structure

```
Hackathon2_CRUD_task_with_agent/
├── src/
│   ├── __init__.py
│   ├── main.py                     # Entry point
│   ├── models/
│   │   ├── __init__.py
│   │   └── task.py                 # Task dataclass
│   ├── services/
│   │   ├── __init__.py
│   │   └── task_service.py         # Business logic
│   ├── storage/
│   │   ├── __init__.py
│   │   └── memory_store.py         # In-memory storage
│   └── cli/
│       ├── __init__.py
│       ├── command_handler.py      # Command dispatcher
│       ├── display.py              # Output formatting
│       └── sort_manager.py         # Sort preference manager
├── specs/                          # Specification documents
├── requirements.txt                # Optional dependencies
├── .gitignore                      # Python ignores
└── README.md                       # This file
```

---

## Troubleshooting

### Python Version Mismatch
**Problem**: Wrong Python version.  
**Solution**:
```bash
python --version  # Check version
python3.12 src/main.py  # Use specific version
```

### Module Not Found
**Problem**: `ModuleNotFoundError`  
**Solution**: Run from repository root:
```bash
cd Hackathon2_CRUD_task_with_agent
python src/main.py
```

### Rich Library Missing
**Problem**: `ModuleNotFoundError: No module named 'rich'`  
**Solution**: Application works without rich (fallback to plain text):
```bash
pip install rich  # Optional: for better formatting
```

---

## Development

### Code Style
- **PEP 8** compliant Python code
- **Type hints** for all function signatures
- **Docstrings** for all public methods
- **Modular architecture** with clear separation of concerns

### Testing
Phase I uses **manual validation** (no automated tests). See `/specs/main/quickstart.md` for validation checklist.

---

## FAQ

**Q: How do I save my tasks?**  
A: Phase I does not support persistence. Tasks are lost on exit. Use Phase II for database storage.

**Q: Can I use task names instead of IDs?**  
A: No, Phase I requires UUID-based IDs. Use the first 8 characters for convenience.

**Q: How do I undo a delete?**  
A: Phase I has no undo functionality. Be careful when deleting tasks.

**Q: Can I import/export tasks?**  
A: Not in Phase I. This feature may be added in future phases.

**Q: Why are duplicate titles allowed?**  
A: For flexibility. You get a warning and confirmation prompt, but can proceed if needed.

---

## Next Steps

After completing Phase I:
1. Verify all 7 commands work correctly
2. Test error handling scenarios
3. Review code structure under `/src`
4. Proceed to Phase II planning (persistence + web UI)

---

## License

See project license file for details.

---

## Credits

**Project**: Evolution of Todo Hackathon  
**Phase**: I - In-Memory Python Console Application  
**Date**: 2026-01-01  
**Constitution**: Spec-Kit Plus (Master Constitution v1.0.0)

---

**README Version**: 1.0.0  
**Last Updated**: 2026-01-01  
**Status**: Phase I Complete ✅


---

## Security

### Password Security
- Passwords hashed with **bcrypt** (cost factor 12)
- Never stored in plaintext
- Minimum 8 characters required

### JWT Authentication
- Tokens signed with JWT_AUTH secret (min 32 chars)
- Token expires after 24 hours
- All protected endpoints validate token

### Multi-User Isolation
- Database queries filtered by authenticated user_id
- Users can only access their own tasks
- 403 Forbidden for unauthorized access

---

## Troubleshooting

**Database Error**: Verify DATABASE_URL in backend .env
**JWT Error**: Set JWT_AUTH in backend .env (min 32 chars)
**API Connection**: Verify backend running on port 8000
**Build Error**: Delete node_modules/.next and reinstall

---

## Phase II Status: ✅ COMPLETE

**Implemented:**
- ✅ JWT authentication with multi-user isolation
- ✅ PostgreSQL persistence (Neon)
- ✅ RESTful API (FastAPI)
- ✅ Modern frontend (Next.js 14 + Tailwind CSS)
- ✅ Full CRUD operations
- ✅ Protected routes
- ✅ Error handling & validation

**Next: Phase III** - AI agent integration

