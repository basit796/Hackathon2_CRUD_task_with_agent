"""Command handling and dispatch for CLI"""
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from src.services.task_service import TaskService
from src.cli.display import Display
from src.cli.sort_manager import SortManager


class CommandHandler:
    """
    Handles command dispatch and interactive prompts.
    
    Attributes:
        task_service: TaskService instance
        display: Display instance for output
        sort_manager: SortManager for user preferences
    """
    
    def __init__(self, task_service: TaskService, display: Display, sort_manager: SortManager):
        """
        Initialize command handler with dependencies.
        
        Args:
            task_service: TaskService instance
            display: Display instance
            sort_manager: SortManager instance
        """
        self.task_service = task_service
        self.display = display
        self.sort_manager = sort_manager
        
        self.commands = {
            'add': self.handle_add,
            'list': self.handle_list,
            'update': self.handle_update,
            'delete': self.handle_delete,
            'toggle': self.handle_toggle,
            'sort': self.handle_sort,
            'help': self.handle_help,
            'exit': self.handle_exit,
            'quit': self.handle_exit,
        }
    
    def dispatch(self, command: str) -> bool:
        """
        Dispatch command to appropriate handler.
        
        Args:
            command: Command name
            
        Returns:
            False if exit command, True otherwise
        """
        command_lower = command.lower().strip()
        
        if not command_lower:
            return True
        
        handler = self.commands.get(command_lower)
        
        if handler:
            return handler()
        else:
            self.display.show_error("Unknown command", f"'{command}'. Type 'help' for available commands")
            return True
    
    def handle_add(self) -> bool:
        """Handle add command with interactive prompts."""
        try:
            title = input("Enter task title: ").strip()
            
            if not title:
                self.display.show_error("Validation Error", "Title cannot be empty")
                return True
            
            description = input("Enter task description (optional): ").strip()
            
            if self.task_service.check_duplicate_title(title):
                self.display.show_duplicate_warning(title)
                confirm = input("Do you want to add it anyway? (y/n): ").strip().lower()
                
                if confirm != 'y':
                    self.display.show_info("Task creation cancelled")
                    return True
            
            success, message, task = self.task_service.add_task(title, description, force=True)
            
            if success:
                self.display.show_success(message)
            else:
                self.display.show_error("Error", message)
        
        except Exception as e:
            self.display.show_error("Error", str(e))
        
        return True
    
    def handle_list(self) -> bool:
        """Handle list command using current sort preference."""
        try:
            sort_option = self.sort_manager.get_sort()
            tasks = self.task_service.list_tasks(sort_option)
            self.display.format_task_list(tasks)
        except Exception as e:
            self.display.show_error("Error", str(e))
        
        return True
    
    def handle_update(self) -> bool:
        """Handle update command with interactive prompts."""
        try:
            task_id = input("Enter task ID (or prefix): ").strip()
            
            if not task_id:
                self.display.show_error("Validation Error", "Task ID is required")
                return True
            
            success, error, task = self.task_service.get_task(task_id)
            
            if not success:
                self.display.show_error("Not Found", error)
                return True
            
            print(f"\nCurrent task: {task.title}")
            print(f"Current description: {task.description}")
            print("\nPress Enter to keep current value, or type new value:")
            
            new_title = input("Update title: ").strip()
            new_description = input("Update description: ").strip()
            
            if not new_title and not new_description:
                self.display.show_info("No changes made")
                return True
            
            title_to_update = new_title if new_title else None
            desc_to_update = new_description if new_description else None
            
            success, message = self.task_service.update_task(task_id, title_to_update, desc_to_update)
            
            if success:
                self.display.show_success(message)
            else:
                self.display.show_error("Error", message)
        
        except Exception as e:
            self.display.show_error("Error", str(e))
        
        return True
    
    def handle_delete(self) -> bool:
        """Handle delete command with interactive prompt."""
        try:
            task_id = input("Enter task ID (or prefix) to delete: ").strip()
            
            if not task_id:
                self.display.show_error("Validation Error", "Task ID is required")
                return True
            
            success, message = self.task_service.delete_task(task_id)
            
            if success:
                self.display.show_success(message)
            else:
                self.display.show_error("Not Found", message)
        
        except Exception as e:
            self.display.show_error("Error", str(e))
        
        return True
    
    def handle_toggle(self) -> bool:
        """Handle toggle command with interactive prompt."""
        try:
            task_id = input("Enter task ID (or prefix) to toggle: ").strip()
            
            if not task_id:
                self.display.show_error("Validation Error", "Task ID is required")
                return True
            
            success, message = self.task_service.toggle_task(task_id)
            
            if success:
                self.display.show_success(message)
            else:
                self.display.show_error("Not Found", message)
        
        except Exception as e:
            self.display.show_error("Error", str(e))
        
        return True
    
    def handle_sort(self) -> bool:
        """Handle sort command with interactive prompt."""
        try:
            print("\nAvailable sort options:")
            for option, description in self.sort_manager.get_all_options().items():
                current = " (current)" if option == self.sort_manager.get_sort() else ""
                print(f"  {option}: {description}{current}")
            
            sort_option = input("\nEnter sort option (A/B/C/D): ").strip().upper()
            
            if self.sort_manager.set_sort(sort_option):
                description = self.sort_manager.get_sort_description(sort_option)
                self.display.show_success(f"Sort preference updated to: {description}")
            else:
                self.display.show_error("Invalid Option", f"'{sort_option}'. Valid options are A, B, C, D")
        
        except Exception as e:
            self.display.show_error("Error", str(e))
        
        return True
    
    def handle_help(self) -> bool:
        """Handle help command displaying all available commands."""
        print("\nAvailable Commands:")
        print("  add              Add a new task (interactive prompts)")
        print("  list             Display all tasks (sorted by current preference)")
        print("  update           Update task title/description (interactive prompts)")
        print("  delete           Delete a task (interactive prompt)")
        print("  toggle           Mark task complete/incomplete (interactive prompt)")
        print("  sort             Change task list sorting order")
        print("  help             Show this help message")
        print("  exit, quit       Exit application")
        print("\nNote: All inputs are provided through interactive prompts (no command-line arguments)")
        print("      Task IDs can be shortened to any unique prefix (e.g., first 8 characters)")
        return True
    
    def handle_exit(self) -> bool:
        """Handle exit command."""
        return False
