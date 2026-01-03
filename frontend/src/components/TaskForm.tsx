'use client';

import React, { useState, useEffect } from 'react';
import { Task, TaskCreate, TaskUpdate, RecurringPattern } from '@/types/task';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (data: TaskCreate | TaskUpdate) => void | Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export default function TaskForm({ task, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringType, setRecurringType] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [dayOfWeek, setDayOfWeek] = useState(2);
  const [recurringTime, setRecurringTime] = useState('14:00');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      if (task.deadline) {
        const date = new Date(task.deadline);
        const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
        setDeadline(localDateTime);
      }
      if (task.recurring) {
        setIsRecurring(true);
        setRecurringType(task.recurring.type);
        if (task.recurring.day_of_week !== undefined) {
          setDayOfWeek(task.recurring.day_of_week);
        }
        if (task.recurring.time) {
          setRecurringTime(task.recurring.time);
        }
      }
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (title.trim().length > 200) {
      setError('Title must be less than 200 characters');
      return;
    }

    if (description.trim().length > 1000) {
      setError('Description must be less than 1000 characters');
      return;
    }

    const submitData: TaskCreate | TaskUpdate = {
      title: title.trim(),
      description: description.trim() || '',
    };

    if (deadline) {
      submitData.deadline = new Date(deadline).toISOString();
    } else {
      submitData.deadline = null;
    }

    if (isRecurring) {
      const recurring: RecurringPattern = {
        type: recurringType,
        time: recurringTime,
      };
      
      if (recurringType === 'weekly') {
        recurring.day_of_week = dayOfWeek;
      }
      
      submitData.recurring = recurring;
    } else {
      submitData.recurring = null;
    }

    onSubmit(submitData);
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-sm">
      <div className="glass-effect rounded-2xl shadow-elegant-lg max-w-md w-full p-6 animate-scaleIn border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">{task ? '✏️ Edit Task' : '➕ Create New Task'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200 animate-slideDown">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter task title"
              maxLength={200}
              disabled={isLoading}
              required
            />
            <p className="text-xs text-gray-500 mt-1.5">{title.length}/200 characters</p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
              placeholder="Enter task description (optional)"
              rows={4}
              maxLength={1000}
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1.5">{description.length}/1000 characters</p>
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1.5">
              Deadline (optional)
            </label>
            <input
              id="deadline"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              disabled={isLoading}
            />
            {deadline && (
              <button
                type="button"
                onClick={() => setDeadline('')}
                className="text-xs text-primary hover:text-blue-700 mt-1.5 font-medium"
                disabled={isLoading}
              >
                Clear deadline
              </button>
            )}
          </div>

          <div className="border-t pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary rounded transition-all"
                disabled={isLoading}
              />
              <span className="text-sm font-medium text-gray-700">🔁 Make this a recurring task</span>
            </label>
          </div>

          {isRecurring && (
            <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200 animate-slideDown">
              <div>
                <label htmlFor="recurringType" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Repeat
                </label>
                <select
                  id="recurringType"
                  value={recurringType}
                  onChange={(e) => setRecurringType(e.target.value as 'daily' | 'weekly' | 'monthly')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  disabled={isLoading}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              {recurringType === 'weekly' && (
                <div>
                  <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Day of Week
                  </label>
                  <select
                    id="dayOfWeek"
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    disabled={isLoading}
                  >
                    {days.map((day, index) => (
                      <option key={index} value={index}>{day}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label htmlFor="recurringTime" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Time
                </label>
                <input
                  id="recurringTime"
                  type="time"
                  value={recurringTime}
                  onChange={(e) => setRecurringTime(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary text-white py-3 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] font-medium shadow-sm"
            >
              {isLoading ? '⏳ Saving...' : task ? '✅ Update Task' : '➕ Create Task'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
