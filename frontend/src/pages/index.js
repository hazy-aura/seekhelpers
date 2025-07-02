

import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000/api';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask.trim() }),
      });
      setNewTask('');
      fetchTasks();
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  const handleToggleCompleted = async (task) => {
    try {
      await fetch(`${API_BASE}/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleDeleteTask = async (_id) => {
    try {
      await fetch(`${API_BASE}/tasks/${_id}`, {
        method: 'DELETE'
      });
      setTasks((prev) => prev.filter((t) => t._id !== _id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Task List</h1>
        <form onSubmit={handleAddTask} className="flex mb-6 space-x-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task"
            className="flex-grow px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg"
          >
            Add
          </button>
        </form>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow"
            >
              <span
                className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
              >
                {task.title}
              </span>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleToggleCompleted(task)}
                  className="px-2 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded"
                >
                  {task.completed ? 'Undo' : 'Done'}
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
