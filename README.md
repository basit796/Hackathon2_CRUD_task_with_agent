# Todo In-Memory Python Console Application (Phase I)

**Version**: 1.0.0  
**Python Version**: 3.12.4 (EXACT)  
**Phase**: I - In-Memory Console Application

---

## Overview

A command-line todo application with in-memory storage for managing tasks. This is Phase I of the 5-phase Evolution of Todo Hackathon, implementing core CRUD operations through an interactive console interface.

### Phase I Features

✅ **Add tasks** - Create tasks with title and description  
✅ **List tasks** - Display all tasks with sorting options  
✅ **Update tasks** - Modify task title and description  
✅ **Delete tasks** - Remove tasks permanently  
✅ **Toggle completion** - Mark tasks as complete/incomplete  
✅ **ID prefix matching** - Use any unique prefix of task ID  
✅ **Duplicate detection** - Warns when adding duplicate titles  
✅ **Sorting options** - 4 different ways to sort task list  
✅ **Interactive prompts** - No command-line arguments required

### Phase I Constraints

❌ **No persistence** - All data is lost on application exit  
❌ **No database** - Uses in-memory dictionary storage  
❌ **No web interface** - Console-only interaction  
❌ **Console-only** - No GUI or mobile app

---

## Prerequisites

- **Python 3.12.4** (exact version required)
- Terminal/Command prompt access
- Optional: `rich` library for enhanced output

---

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd Hackathon2_CRUD_task_with_agent
```

### 2. Verify Python Version

```bash
python --version
# Should output: Python 3.12.4
```

If you have multiple Python versions:

```bash
python3.12 --version
```

### 3. Install Optional Dependencies (Enhanced UI)

```bash
pip install -r requirements.txt
```

**Note**: The application works without `rich`, but it provides better table formatting and colors.

---

## How to Run

### Start the Application

```bash
python src/main.py
```

Or with specific Python version:

```bash
python3.12 src/main.py
```

### Expected Output

```
============================================================
Todo Application - Phase I (In-Memory Console)
============================================================

Welcome! This is an in-memory task management application.
All data will be lost when you exit the application.

Type 'help' for available commands, or 'exit' to quit.
============================================================

todo> _
```

---

## Commands

### 1. Add Task

**Command**: `add`

**Description**: Add a new task with interactive prompts for title and description.

**Example**:
```
todo> add
Enter task title: Buy groceries
Enter task description (optional): Milk, bread, and eggs
✓ Task 550e8400 added successfully
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
