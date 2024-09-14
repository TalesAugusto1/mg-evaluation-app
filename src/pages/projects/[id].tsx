"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Project } from '@/types/project';
import { Task } from '@/types/task';
import { useAuth } from '@/context/authContext';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'; 
import Link from 'next/link';

const ProjectDetails = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{ name: string; description: string; status: string; dueDate: string; assignedUserId: string }>({
    name: '', 
    description: '', 
    status: 'todo', 
    dueDate: '', 
    assignedUserId: '' 
  });
  const [editingTask, setEditingTask] = useState<{ id: string; name: string; description: string; status: string; dueDate: string; assignedUserId: string } | null>(null);
  const [editingProject, setEditingProject] = useState<{ name: string; description: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]); // List of users

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);

      // Fetch project details
      fetch(`http://localhost:3001/api/projects/${id}`)
        .then(response => response.json())
        .then(data => setProject(data))
        .catch(err => setError('Failed to fetch project details' + err))
        .finally(() => setLoading(false));

      // Fetch tasks for the project
      fetch(`http://localhost:3001/api/projects/${id}/tasks`)
        .then(response => response.json())
        .then(data => setTasks(data))
        .catch(err => setError('Failed to fetch tasks' + err));

      // Fetch users for task assignment
      fetch('http://localhost:3001/api/users')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(err => setError('Failed to fetch users' + err));
    }
  }, [id]);

  const handleAddTask = async () => {
    if (id && newTask.name && newTask.description && newTask.status && newTask.dueDate) {
      try {
        const response = await fetch(`http://localhost:3001/api/projects/${id}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...newTask,
            projectId: id,
            userId: userId, 
          }),
        });

        if (response.ok) {
          const addedTask = await response.json();
          setTasks([...tasks, addedTask]);
          setNewTask({ name: '', description: '', status: 'todo', dueDate: '', assignedUserId: '' }); 
        } else {
          console.error('Failed to add task');
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      console.error('All fields are required');
    }
  };

  const handleEditTask = async () => {
    if (editingTask) {
      try {
        const response = await fetch(`http://localhost:3001/api/tasks/${editingTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: editingTask.name,
            description: editingTask.description,
            status: editingTask.status,
            dueDate: editingTask.dueDate,
            assignedUserId: editingTask.assignedUserId,
          }),
        });

        if (response.ok) {
          const updatedTask = await response.json();
          setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
          setEditingTask(null); 
        } else {
          console.error('Failed to edit task');
        }
      } catch (error) {
        console.error('Error editing task:', error);
      }
    } else {
      console.error('No task selected for editing');
    }
  };

  const handleEditProject = async () => {
    if (editingProject) {
      try {
        const response = await fetch(`http://localhost:3001/api/projects/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingProject),
        });

        if (response.ok) {
          const updatedProject = await response.json();
          setProject(updatedProject);
          setEditingProject(null); 
        } else {
          console.error('Failed to edit project');
        }
      } catch (error) {
        console.error('Error editing project:', error);
      }
    } else {
      console.error('No project selected for editing');
    }
  };

  const handleTaskEditClick = (task: Task) => {
    setEditingTask({ 
      id: task.id, 
      name: task.name, 
      description: task.description, 
      status: task.status,
      dueDate: task.dueDate,
      assignedUserId: task.assignedUserId 
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>No project found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative">
      <Link href="/" passHref>
        <button className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Voltar para Home
        </button>
      </Link>
      <div className="w-full max-w-4xl p-4">
        <div className="relative bg-gray-800 bg-opacity-50 p-4 rounded-lg mt-6">
          <h1 className="text-3xl font-bold mb-4">{editingProject ? (
            <input
              type="text"
              value={editingProject.name}
              onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-700 text-white"
            />
          ) : (
            project.name
          )}
          </h1>
          <button
            onClick={() => setEditingProject(editingProject ? null : { name: project.name, description: project.description })}
            className="absolute top-0 right-0 mt-2 mr-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            <AiOutlineEdit size={24} />
          </button>
          <p>
            {editingProject ? (
              <textarea
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-700 text-white"
              />
            ) : (
              project.description
            )}
          </p>

          {editingProject && (
            <button
              onClick={handleEditProject}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          )}
        </div>

        {/* Tasks section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Tasks</h2>

          {/* Input fields for new task */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Task name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"
            />
            <textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"
            />
            <input
              type="date"
              placeholder="Due date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"
            />
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
            <select
              value={newTask.assignedUserId}
              onChange={(e) => setNewTask({ ...newTask, assignedUserId: e.target.value })}
              className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"
            >
              <option value="">Assign to...</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>

          {/* Tasks table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Due Date</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Assigned User</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-4 py-2 border">{task.name}</td>
                    <td className="px-4 py-2 border">{task.description}</td>
                    <td className="px-4 py-2 border">{task.dueDate}</td>
                    <td className="px-4 py-2 border">{task.status}</td>
                    <td className="px-4 py-2 border">
                      {users.find(user => user.id === task.assignedUserId)?.name || 'Unassigned'}
                    </td>
                    <td className="px-4 py-2 border flex items-center">
                      <button
                        onClick={() => handleTaskEditClick(task)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <AiOutlineEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-500 hover:text-red-600 ml-4"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Editing Task Form */}
          {editingTask && (
            <div className="mt-4 p-4 bg-gray-800 rounded">
              <h3 className="text-xl font-bold mb-2">Edit Task</h3>
              <input
                type="text"
                value={editingTask.name}
                onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"
              />
              <textarea
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"
              />
              <input
                type="date"
                value={editingTask.dueDate}
                onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"
              />
              <select
                value={editingTask.status}
                onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
              <select
                value={editingTask.assignedUserId}
                onChange={(e) => setEditingTask({ ...editingTask, assignedUserId: e.target.value })}
                className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"
              >
                <option value="">Assign to...</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              <button
                onClick={handleEditTask}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
