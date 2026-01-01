"""Task data model for the Todo application"""
from dataclasses import dataclass
from datetime import datetime
import uuid


@dataclass
class Task:
    """
    Represents a todo task with title, description, and completion status.
    
    Attributes:
        id: Unique identifier (UUID v4)
        title: Task title (required, non-empty)
        description: Detailed description (optional)
        completed: Completion status (default False)
        created_at: Creation timestamp (ISO 8601 UTC)
    """
    id: str
    title: str
    description: str
    completed: bool
    created_at: str
    
    @staticmethod
    def create(title: str, description: str = "") -> 'Task':
        """
        Factory method to create a new Task with generated ID and timestamp.
        
        Args:
            title: Task title (required, non-empty)
            description: Task description (optional)
            
        Returns:
            New Task instance
            
        Raises:
            ValueError: If title is empty or whitespace-only
        """
        title = title.strip()
        if not title:
            raise ValueError("Title cannot be empty")
        
        if len(title) > 200:
            raise ValueError("Title cannot exceed 200 characters")
        
        description = description.strip()
        if len(description) > 1000:
            raise ValueError("Description cannot exceed 1000 characters")
        
        return Task(
            id=str(uuid.uuid4()),
            title=title,
            description=description,
            completed=False,
            created_at=datetime.utcnow().isoformat()
        )
    
    def update(self, title: str | None = None, description: str | None = None) -> None:
        """
        Update task title and/or description.
        
        Args:
            title: New title (optional)
            description: New description (optional)
            
        Raises:
            ValueError: If title is empty or whitespace-only
            ValueError: If no fields provided for update
        """
        if title is None and description is None:
            raise ValueError("At least one field must be provided for update")
        
        if title is not None:
            title = title.strip()
            if not title:
                raise ValueError("Title cannot be empty")
            if len(title) > 200:
                raise ValueError("Title cannot exceed 200 characters")
            self.title = title
        
        if description is not None:
            description = description.strip()
            if len(description) > 1000:
                raise ValueError("Description cannot exceed 1000 characters")
            self.description = description
    
    def toggle_completed(self) -> None:
        """Toggle completion status between True and False."""
        self.completed = not self.completed
    
    def short_id(self) -> str:
        """Return first 8 characters of ID for display."""
        return self.id[:8]
    
    def to_dict(self) -> dict:
        """Convert Task to dictionary (for future serialization)."""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed,
            'created_at': self.created_at
        }
    
    @staticmethod
    def from_dict(data: dict) -> 'Task':
        """Create Task from dictionary (for future deserialization)."""
        return Task(
            id=data['id'],
            title=data['title'],
            description=data['description'],
            completed=data['completed'],
            created_at=data['created_at']
        )
