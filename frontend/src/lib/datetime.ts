export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return 'No deadline';
  
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'No deadline';
  
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function isOverdue(deadline: string | null | undefined, completed: boolean): boolean {
  if (!deadline || completed) return false;
  return new Date(deadline) < new Date();
}

export function isUpcoming(deadline: string | null | undefined): boolean {
  if (!deadline) return false;
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const hoursDiff = (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  return hoursDiff >= 0 && hoursDiff <= 24;
}

export function toISOString(date: Date | null | undefined): string | null {
  if (!date) return null;
  return date.toISOString();
}
