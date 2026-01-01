"""User sorting preference management"""


class SortManager:
    """
    Manages user's current sorting preference for task list display.
    
    Attributes:
        _current_sort: Current sort option (A/B/C/D)
    """
    
    SORT_OPTIONS = {
        'A': 'Insertion order',
        'B': 'Creation time (oldest first)',
        'C': 'Creation time (newest first)',
        'D': 'Incomplete first, then by creation time'
    }
    
    def __init__(self):
        """Initialize with default sort option (D)."""
        self._current_sort = 'D'
    
    def get_sort(self) -> str:
        """
        Get current sort preference.
        
        Returns:
            Current sort option (A/B/C/D)
        """
        return self._current_sort
    
    def set_sort(self, sort_option: str) -> bool:
        """
        Set sort preference with validation.
        
        Args:
            sort_option: Sort option to set (A/B/C/D)
            
        Returns:
            True if valid and set, False otherwise
        """
        sort_option = sort_option.upper()
        if sort_option in self.SORT_OPTIONS:
            self._current_sort = sort_option
            return True
        return False
    
    def get_sort_description(self, sort_option: str = None) -> str:
        """
        Get human-readable description of sort option.
        
        Args:
            sort_option: Sort option to describe (defaults to current)
            
        Returns:
            Description of the sort option
        """
        option = sort_option.upper() if sort_option else self._current_sort
        return self.SORT_OPTIONS.get(option, "Unknown sort option")
    
    def get_all_options(self) -> dict:
        """
        Get all available sort options with descriptions.
        
        Returns:
            Dictionary of sort options and descriptions
        """
        return self.SORT_OPTIONS.copy()
