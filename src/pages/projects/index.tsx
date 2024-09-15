import React, { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import Link from 'next/link';
import { AiOutlinePlus } from 'react-icons/ai'; // Importa o ícone de +

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);

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
      setFeedbackMessage('Projeto criado com sucesso!');
    } else {
      setFeedbackMessage('Erro ao criar projeto.');
    }

    setTimeout(() => setFeedbackMessage(null), 3000);
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
        setFeedbackMessage('Projeto excluído com sucesso!');
      } else {
        setFeedbackMessage('Erro ao excluir projeto.');
      }
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      setFeedbackMessage('Erro ao excluir projeto.');
    }

    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Botão de Voltar */}
      <Link href="/" passHref>
        <button className="fixed top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Voltar para Home
        </button>
      </Link>

      {/* Cabeçalho fixo */}
      <h1 className="fixed top-4 left-1/2 transform -translate-x-1/2 text-4xl font-bold">
        Gerenciamento de Projetos
      </h1>

      {/* Conteúdo rolável */}
      <div className="mt-24 p-6 overflow-y-auto h-[calc(100vh-6rem)]">
        {/* Mensagem de Feedback */}
        {feedbackMessage && (
          <div className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
            {feedbackMessage}
          </div>
        )}

        {/* Lista de Projetos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center text-center relative"
            >
              <button
                onClick={() => handleDelete(project.id)}
                className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Excluir
              </button>

              <Link href={`/projects/${project.id}`} passHref>
                <button className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Editar
                </button>
              </Link>

              <h2 className="text-xl font-bold mb-2">{project.name}</h2>
              <p>{project.description}</p>
            </div>
          ))}
        </div>

        {/* Formulário de Criação */}
        {formVisible && (
          <form onSubmit={handleCreate} className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md mb-6 mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Criar Novo Projeto</h2>

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

            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Criar Projeto
            </button>
          </form>
        )}
      </div>

      {/* Botão de Toggle para Formulário */}
      <button
        onClick={() => setFormVisible(!formVisible)}
        className={`fixed ${projects.length === 0 ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'bottom-4 right-4'} p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all`}
        aria-label={formVisible ? "Fechar formulário de criação" : "Mostrar formulário de criação"}
      >
        <AiOutlinePlus className="w-8 h-8" />
      </button>
    </div>
  );
};

export default Projects;
