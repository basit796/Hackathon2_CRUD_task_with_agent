"""Event schemas for event-driven architecture."""
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal, Optional, Dict, Any
from enum import Enum


class EventType(str, Enum):
    """Event types for task operations."""
    CREATED = "created"
    UPDATED = "updated"
    COMPLETED = "completed"
    DELETED = "deleted"


class TaskEvent(BaseModel):
    """Event published when a task is created, updated, completed, or deleted."""
    event_id: str
    event_type: EventType
    task_id: int
    task_data: Dict[str, Any]
    user_id: str
    timestamp: datetime
    

class ReminderEvent(BaseModel):
    """Event published for scheduled reminders."""
    event_id: str
    task_id: int
    title: str
    description: Optional[str] = None
    due_at: datetime
    remind_at: datetime
    user_id: str
    timestamp: datetime


class TaskUpdateEvent(BaseModel):
    """Real-time sync event for WebSocket clients."""
    event_id: str
    action: Literal["create", "update", "delete", "complete"]
    task_id: int
    task_data: Optional[Dict[str, Any]] = None
    user_id: str
    timestamp: datetime


class AuditLogEvent(BaseModel):
    """Audit log event for activity tracking."""
    event_id: str
    service_name: str
    action: str
    resource_type: str
    resource_id: str
    user_id: Optional[str] = None
    details: Dict[str, Any]
    timestamp: datetime
