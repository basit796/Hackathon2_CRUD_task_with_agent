"""In-memory storage for Task entities"""
from typing import Dict, List, Optional
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from src.models.task import Task


class MemoryStore:
    """
    In-memory storage for Task entities using dictionary.
    
    Attributes:
        _tasks: Dictionary mapping task IDs to Task objects
    """
    
    def __init__(self):
        """Initialize empty task store."""
        self._tasks: Dict[str, Task] = {}
    
    def add(self, task: Task) -> None:
        """
        Add task to store.
        
        Args:
            task: Task to add
        """
        self._tasks[task.id] = task
    
    def get(self, task_id: str) -> Optional[Task]:
        """
        Get task by ID.
        
        Args:
            task_id: Task ID to lookup
            
        Returns:
            Task if found, None otherwise
        """
        return self._tasks.get(task_id)
    
    def get_all(self) -> List[Task]:
        """
        Get all tasks in insertion order.
        
        Returns:
            List of all tasks
        """
        return list(self._tasks.values())
    
    def get_all_sorted(self, sort_option: str = 'D') -> List[Task]:
        """
        Get all tasks with specified sorting.
        
        Args:
            sort_option: Sorting option (A/B/C/D)
                A: Insertion order
                B: Creation time (oldest first)
                C: Creation time (newest first)
                D: Incomplete first, then by creation time (DEFAULT)
        
        Returns:
            List of sorted tasks
        """
        tasks = list(self._tasks.values())
        
        if sort_option == 'A':
            return tasks
        elif sort_option == 'B':
            return sorted(tasks, key=lambda t: t.created_at)
        elif sort_option == 'C':
            return sorted(tasks, key=lambda t: t.created_at, reverse=True)
        elif sort_option == 'D':
            return sorted(tasks, key=lambda t: (t.completed, t.created_at))
        else:
            return sorted(tasks, key=lambda t: (t.completed, t.created_at))
    
    def find_by_prefix(self, prefix: str) -> List[str]:
        """
        Find task IDs matching the given prefix.
        
        Args:
            prefix: ID prefix to search for
            
        Returns:
            List of matching task IDs
        """
        return [task_id for task_id in self._tasks.keys() if task_id.startswith(prefix)]
    
    def check_duplicate_title(self, title: str) -> bool:
        """
        Check if a task with the given title already exists (case-insensitive).
        
        Args:
            title: Task title to check
            
        Returns:
            True if duplicate exists, False otherwise
        """
        normalized_title = title.strip().lower()
        return any(task.title.strip().lower() == normalized_title for task in self._tasks.values())
    
    def delete(self, task_id: str) -> bool:
        """
        Delete task by ID.
        
        Args:
            task_id: Task ID to delete
            
        Returns:
            True if task was deleted, False if not found
        """
        if task_id in self._tasks:
            del self._tasks[task_id]
            return True
        return False
    
    def exists(self, task_id: str) -> bool:
        """
        Check if task exists.
        
        Args:
            task_id: Task ID to check
            
        Returns:
            True if task exists, False otherwise
        """
        return task_id in self._tasks
    
    def count(self) -> int:
        """
        Get total number of tasks.
        
        Returns:
            Task count
        """
        return len(self._tasks)
