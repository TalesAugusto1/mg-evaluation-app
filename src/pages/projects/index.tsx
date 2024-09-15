import React, { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import Link from 'next/link';
import { AiOutlinePlus, AiOutlineClose, AiOutlineHome } from 'react-icons/ai'; // Importa o ícone de casa

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
      setFormVisible(false); // Ocultar o formulário após a criação
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
      {/* Cabeçalho estilizado */}
      <header className="fixed top-0 left-0 right-0 bg-gray-800 p-4 shadow-md z-10 flex items-center">
        <div className="flex items-center">
          <Link href="/" passHref>
            <button className="bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition-colors">
              <AiOutlineHome className="w-6 h-6" />
            </button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-white mx-auto">Gerenciamento de Projetos</h1>
       
      </header>

      {/* Conteúdo rolável */}
      <main className="mt-20 p-6 overflow-y-auto h-[calc(100vh-6rem)]">
        {/* Mensagem de Feedback */}
        {feedbackMessage && (
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 shadow-lg">
            {feedbackMessage}
          </div>
        )}

        {/* Lista de Projetos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center text-center relative shadow-lg"
            >
              <button
                onClick={() => handleDelete(project.id)}
                className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors"
              >
                Excluir
              </button>

              <Link href={`/projects/${project.id}`} passHref>
                <button className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
                  Editar
                </button>
              </Link>

              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              <p>{project.description}</p>
            </div>
          ))}
        </div>

        {/* Formulário de Criação */}
        {formVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <form onSubmit={handleCreate} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-white">Criar Novo Projeto</h2>
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Fechar formulário de criação"
                >
                  <AiOutlineClose className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nome do Projeto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Descrição do Projeto"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors"
              >
                Criar Projeto
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Botão de Toggle para Formulário */}
      {!formVisible && (
        <button
          onClick={() => setFormVisible(true)}
          className={`fixed ${projects.length === 0 ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'bottom-10 right-10'} p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors`}
          aria-label="Mostrar formulário de criação"
        >
          <AiOutlinePlus className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default Projects;
