"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Project } from '@/types/project';
import { Task } from '@/types/task';
import { useAuth } from '@/context/authContext';
import { AiOutlineEdit } from 'react-icons/ai'; 

const ProjectDetails = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{ name: string; description: string }>({ name: '', description: '' });
  const [editingTask, setEditingTask] = useState<{ id: string; name: string; description: string } | null>(null);
  const [editingProject, setEditingProject] = useState<{ name: string; description: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    }
  }, [id]);

  const handleAddTask = async () => {
    if (id && newTask.name && newTask.description) {
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
          setNewTask({ name: '', description: '' }); 
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
    setEditingTask({ id: task.id, name: task.name, description: task.description });
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
          <div className="mb-4">
            <input
              type="text"
              placeholder="Task name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-700 text-white mt-2"
            />
            <button
              onClick={handleAddTask}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Task
            </button>
          </div>
  
          {editingTask && (
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Edit Task</h3>
              <input
                type="text"
                placeholder="Task name"
                value={editingTask.name}
                onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-700 text-white"
              />
              <input
                type="text"
                placeholder="Task description"
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-700 text-white mt-2"
              />
              <button
                onClick={handleEditTask}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          )}
  
          <ul>
            {tasks.map(task => (
              <li key={task.id} className="mb-4">
                <h3 className="text-xl font-bold">{task.name}</h3>
                <p>{task.description}</p>
                <button
                  onClick={() => handleTaskEditClick(task)}
                  className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
};

export default ProjectDetails;
