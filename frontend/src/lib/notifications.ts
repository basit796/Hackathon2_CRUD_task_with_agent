import { Task } from '@/types/task';

export function checkRecurringTaskNotifications(tasks: Task[]): void {
  if (!('Notification' in window)) return;

  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }

  if (Notification.permission !== 'granted') return;

  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  tasks.forEach(task => {
    if (!task.recurring || task.completed) return;

    const shouldNotify = checkIfShouldNotify(task, currentDay, currentHour, currentMinute);
    
    if (shouldNotify) {
      const notificationKey = `notification_${task.id}_${now.toDateString()}`;
      
      if (!localStorage.getItem(notificationKey)) {
        showNotification(task);
        localStorage.setItem(notificationKey, 'shown');
        
        setTimeout(() => {
          localStorage.removeItem(notificationKey);
        }, 24 * 60 * 60 * 1000);
      }
    }
  });
}

function checkIfShouldNotify(task: Task, currentDay: number, currentHour: number, currentMinute: number): boolean {
  if (!task.recurring) return false;

  const { type, day_of_week, time } = task.recurring;

  if (type === 'weekly' && day_of_week !== undefined) {
    if (currentDay !== day_of_week) return false;
  }

  if (time) {
    const [hour, minute] = time.split(':').map(Number);
    const timeDiff = Math.abs((currentHour * 60 + currentMinute) - (hour * 60 + minute));
    
    return timeDiff <= 5;
  }

  return false;
}

function showNotification(task: Task): void {
  const title = '🔔 Task Reminder';
  const body = `${task.title}${task.recurring?.time ? ` - Scheduled for ${task.recurring.time}` : ''}`;
  
  const notification = new Notification(title, {
    body,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: task.id,
    requireInteraction: true,
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };

  setTimeout(() => notification.close(), 10000);
}

export function requestNotificationPermission(): void {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}
