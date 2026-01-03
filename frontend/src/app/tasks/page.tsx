'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api, getErrorMessage } from '@/lib/api';
import { Task, TaskCreate, TaskUpdate, FilterType, SortType } from '@/types/task';
import ProtectedRoute from '@/components/ProtectedRoute';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import { checkRecurringTaskNotifications, requestNotificationPermission } from '@/lib/notifications';

export default function TasksPage() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('created_desc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (user) {
      loadTasks();
      requestNotificationPermission();
      
      const notificationInterval = setInterval(() => {
        if (tasks.length > 0) {
          checkRecurringTaskNotifications(tasks);
        }
      }, 60000);

      return () => clearInterval(notificationInterval);
    }
  }, [user, filter, sort, search]);

  useEffect(() => {
    if (tasks.length > 0) {
      checkRecurringTaskNotifications(tasks);
    }
  }, [tasks]);

  const loadTasks = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.getTasks(user.id, filter, sort, search || undefined);
      setTasks(response.tasks);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (data: TaskCreate) => {
    if (!user) return;
    
    try {
      setIsSubmitting(true);
      setError(null);
      await api.createTask(user.id, data);
      setShowForm(false);
      await loadTasks();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async (data: TaskUpdate) => {
    if (!user || !editingTask) return;
    
    try {
      setIsSubmitting(true);
      setError(null);
      await api.updateTask(user.id, editingTask.id, data);
      setEditingTask(null);
      await loadTasks();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTask = async (taskId: string) => {
    if (!user) return;
    
    try {
      setError(null);
      await api.toggleTaskCompletion(user.id, taskId);
      await loadTasks();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!user) return;
    
    try {
      setError(null);
      await api.deleteTask(user.id, taskId);
      await loadTasks();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleSubmitTask = async (data: TaskCreate | TaskUpdate) => {
    if (editingTask) {
      await handleUpdateTask(data);
    } else {
      await handleCreateTask(data as TaskCreate);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-light via-white to-blue-50">
        <header className="glass-effect shadow-elegant border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">My Tasks</h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 font-medium hidden sm:block">{user?.email}</span>
                <button
                  onClick={() => window.location.href = '/profile'}
                  className="px-4 py-2 text-sm font-medium text-primary bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  👤 Profile
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-danger bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 animate-slideDown flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="mb-8 flex flex-wrap gap-4 items-center animate-slideDown">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 transform hover:scale-105 font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Task
            </button>

            <div className="flex gap-2 items-center">
              <label htmlFor="filter" className="text-sm font-medium text-gray-700">
                Filter:
              </label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
              >
                <option value="all">All Tasks</option>
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
                <option value="overdue">Overdue</option>
                <option value="upcoming">Due Soon (24h)</option>
                <option value="no-deadline">No Deadline</option>
              </select>
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sort:
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortType)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
              >
                <option value="created_desc">Newest First</option>
                <option value="created_asc">Oldest First</option>
                <option value="title_asc">Title (A-Z)</option>
                <option value="title_desc">Title (Z-A)</option>
                <option value="status">Status (Incomplete First)</option>
                <option value="deadline_asc">Deadline (Earliest)</option>
                <option value="deadline_desc">Deadline (Latest)</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px] relative">
              <input
                type="text"
                placeholder="🔍 Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
              />
            </div>
          </div>

          <div className="glass-effect rounded-2xl shadow-elegant-lg p-6 border border-gray-200">
            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              isLoading={isLoading}
            />
          </div>

          {(showForm || editingTask) && (
            <TaskForm
              task={editingTask}
              onSubmit={handleSubmitTask}
              onCancel={handleCancelForm}
              isLoading={isSubmitting}
            />
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
