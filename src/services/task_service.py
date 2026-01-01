"""Business logic for task operations"""
from typing import List, Optional, Tuple
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from src.models.task import Task
from src.storage.memory_store import MemoryStore


class TaskService:
    """
    Service layer for task operations with validation and business logic.
    
    Attributes:
        store: MemoryStore instance for data persistence
    """
    
    def __init__(self, store: MemoryStore):
        """
        Initialize TaskService with storage dependency.
        
        Args:
            store: MemoryStore instance
        """
        self.store = store
    
    def add_task(self, title: str, description: str = "", force: bool = False) -> Tuple[bool, str, Optional[Task]]:
        """
        Add a new task with duplicate title check.
        
        Args:
            title: Task title
            description: Task description (optional)
            force: Skip duplicate check if True
            
        Returns:
            Tuple of (success, message, task)
            - success: True if task added, False if duplicate found and not forced
            - message: Status message
            - task: Created Task object or None
        """
        try:
            if not force and self.store.check_duplicate_title(title):
                return False, "duplicate", None
            
            task = Task.create(title, description)
            self.store.add(task)
            return True, f"Task {task.short_id()} added successfully", task
        except ValueError as e:
            return False, str(e), None
    
    def get_task(self, task_id_or_prefix: str) -> Tuple[bool, str, Optional[Task]]:
        """
        Get task by ID or prefix with resolution.
        
        Args:
            task_id_or_prefix: Full task ID or prefix
            
        Returns:
            Tuple of (success, message, task)
            - success: True if task found
            - message: Error message or empty string
            - task: Task object or None
        """
        resolved_id, error = self.resolve_id_prefix(task_id_or_prefix)
        
        if error:
            return False, error, None
        
        task = self.store.get(resolved_id)
        if task:
            return True, "", task
        else:
            return False, f"Task not found: {task_id_or_prefix}", None
    
    def resolve_id_prefix(self, prefix: str) -> Tuple[Optional[str], Optional[str]]:
        """
        Resolve ID prefix to full ID.
        
        Args:
            prefix: ID prefix (any length)
            
        Returns:
            Tuple of (resolved_id, error_message)
            - resolved_id: Full task ID if unique match, None otherwise
            - error_message: Error description or None
        """
        matching_ids = self.store.find_by_prefix(prefix)
        
        if len(matching_ids) == 0:
            return None, f"Task not found: {prefix}"
        elif len(matching_ids) == 1:
            return matching_ids[0], None
        else:
            short_ids = [id[:8] for id in matching_ids]
            return None, f"Ambiguous ID prefix '{prefix}': matches {', '.join(short_ids)}"
    
    def check_duplicate_title(self, title: str) -> bool:
        """
        Check if title already exists.
        
        Args:
            title: Task title to check
            
        Returns:
            True if duplicate exists, False otherwise
        """
        return self.store.check_duplicate_title(title)
    
    def update_task(self, task_id_or_prefix: str, title: Optional[str] = None, 
                    description: Optional[str] = None) -> Tuple[bool, str]:
        """
        Update task with ID prefix support.
        
        Args:
            task_id_or_prefix: Full task ID or prefix
            title: New title (optional)
            description: New description (optional)
            
        Returns:
            Tuple of (success, message)
        """
        success, error, task = self.get_task(task_id_or_prefix)
        
        if not success:
            return False, error
        
        try:
            task.update(title, description)
            return True, f"Task {task.short_id()} updated successfully"
        except ValueError as e:
            return False, str(e)
    
    def delete_task(self, task_id_or_prefix: str) -> Tuple[bool, str]:
        """
        Delete task with ID prefix support.
        
        Args:
            task_id_or_prefix: Full task ID or prefix
            
        Returns:
            Tuple of (success, message)
        """
        resolved_id, error = self.resolve_id_prefix(task_id_or_prefix)
        
        if error:
            return False, error
        
        if self.store.delete(resolved_id):
            return True, f"Task {resolved_id[:8]} deleted successfully"
        else:
            return False, f"Task not found: {task_id_or_prefix}"
    
    def toggle_task(self, task_id_or_prefix: str) -> Tuple[bool, str]:
        """
        Toggle task completion status with ID prefix support.
        
        Args:
            task_id_or_prefix: Full task ID or prefix
            
        Returns:
            Tuple of (success, message)
        """
        success, error, task = self.get_task(task_id_or_prefix)
        
        if not success:
            return False, error
        
        task.toggle_completed()
        status = "complete" if task.completed else "incomplete"
        return True, f"Task {task.short_id()} marked as {status}"
    
    def list_tasks(self, sort_option: str = 'D') -> List[Task]:
        """
        List all tasks with specified sorting.
        
        Args:
            sort_option: Sort option (A/B/C/D)
            
        Returns:
            List of tasks sorted by specified option
        """
        return self.store.get_all_sorted(sort_option)
