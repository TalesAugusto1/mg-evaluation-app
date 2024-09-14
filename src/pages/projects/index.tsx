import React, { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import Link from 'next/link';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("Usuário não está logado.");
      return;
    }

    fetch(`http://localhost:3001/api/projects?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("A resposta da API não é um array:", data);
        }
      })
      .catch(error => console.error("Erro ao buscar projetos:", error));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("Usuário não está logado ou o userId não foi encontrado.");
      return;
    }

    const response = await fetch('http://localhost:3001/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, userId }), 
    });

    if (response.ok) {
      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setName('');
      setDescription('');
    }
  };

  const handleDelete = async (projectId: string) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este projeto?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects(projects.filter(project => project.id !== projectId));
      } else {
        console.error('Falha ao excluir projeto');
      }
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white relative p-4">
      <Link href="/" passHref>
        <button className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Voltar para Home
        </button>
      </Link>
      <h1 className="text-4xl font-bold mb-6">Projetos</h1>
      <form onSubmit={handleCreate} className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm mb-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nome do Projeto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Descrição do Projeto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Criar Projeto</button>
      </form>
      <div className="w-full max-w-5xl flex flex-wrap gap-4 justify-center">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 p-4 rounded flex flex-col items-center justify-center text-center w-60 h-32 relative"
          >
            <button
              onClick={() => handleDelete(project.id)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Excluir
            </button>
            <Link href={`/projects/${project.id}`} passHref>
              
                <button
                  className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Editar
                </button>
              
            </Link>
            <h2 className="text-xl font-bold mb-2">{project.name}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
