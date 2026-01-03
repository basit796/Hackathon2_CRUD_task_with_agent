'use client';

import React, { useState } from 'react';
import { Task } from '@/types/task';
import { formatDateTime, isOverdue, isUpcoming } from '@/lib/datetime';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      onDelete(task.id);
    }
  };

  const handleToggle = async () => {
    if (isToggling) return;
    
    setIsToggling(true);
    try {
      await onToggle(task.id);
    } finally {
      setTimeout(() => setIsToggling(false), 500);
    }
  };

  const getRecurringLabel = () => {
    if (!task.recurring) return null;
    
    const { type, day_of_week, time } = task.recurring;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    if (type === 'weekly' && day_of_week !== undefined) {
      return `🔁 Repeats every ${days[day_of_week]}${time ? ` at ${time}` : ''}`;
    } else if (type === 'daily') {
      return `🔁 Repeats daily${time ? ` at ${time}` : ''}`;
    } else if (type === 'monthly') {
      return `🔁 Repeats monthly${time ? ` at ${time}` : ''}`;
    }
    return null;
  };

  return (
    <div
      className={`glass-effect border rounded-xl p-5 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 transform hover:scale-[1.01] animate-slideUp ${
        task.completed ? 'opacity-70 bg-gray-50' : ''
      } ${isOverdue(task.deadline, task.completed) ? 'border-l-4 border-l-danger' : ''} ${
        isUpcoming(task.deadline) && !task.completed ? 'border-l-4 border-l-warning' : 'border-l-4 border-l-accent'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            disabled={isToggling}
            className={`w-6 h-6 text-primary focus:ring-2 focus:ring-primary rounded-md cursor-pointer transition-all duration-200 ${
              isToggling ? 'opacity-50 cursor-wait' : 'hover:scale-110'
            }`}
          />
          {isToggling && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold transition-all duration-300 ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className={`mt-2 text-sm transition-all duration-300 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
          {task.deadline && (
            <div className="mt-3">
              <span
                className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isOverdue(task.deadline, task.completed)
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : isUpcoming(task.deadline) && !task.completed
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                {isOverdue(task.deadline, task.completed) && '🔴 Overdue: '}
                {isUpcoming(task.deadline) && !task.completed && '⚠️ Due soon: '}
                {!isOverdue(task.deadline, task.completed) && !isUpcoming(task.deadline) && '📅 '}
                {formatDateTime(task.deadline)}
              </span>
            </div>
          )}
          {getRecurringLabel() && (
            <div className="mt-2">
              <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                {getRecurringLabel()}
              </span>
            </div>
          )}
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date(task.created_at).toLocaleDateString()}
            </span>
            {task.updated_at !== task.created_at && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {new Date(task.updated_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="px-4 py-2 text-sm font-medium text-primary bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting || isToggling}
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-danger bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting || isToggling}
          >
            {isDeleting ? '⏳ Deleting...' : '🗑️ Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
