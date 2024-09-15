import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { Project } from '@/types/project';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineLogout } from 'react-icons/ai'; // Ícone de logout

interface MainContentProps {
  children: React.ReactNode;
  projects: Project[];
}

const MainContent: React.FC<MainContentProps> = ({ children, projects }) => {
  const { name, profilePicture, logout } = useAuth();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); // Controle de fade out

  useEffect(() => {
    if (projects.length > 0) {
      // Exibe a mensagem de sucesso por 5 segundos
      setShowSuccessMessage(true);
      setFadeOut(false); // Inicia sem fade out

      const timer = setTimeout(() => {
        setFadeOut(true); // Inicia o fade out após 3,5 segundos
      }, 3000);

      const hideTimer = setTimeout(() => {
        setShowSuccessMessage(false); // Remove a mensagem após o fade
      }, 10000); // 1,5 segundos de fade

      // Limpar o temporizador ao desmontar
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [projects]);

  return (
    <div className="flex-1 flex flex-col bg-black text-white relative min-h-screen">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center w-full p-4 bg-gray-900">
        {/* Texto "Bem-vindo" à esquerda */}
        <div className="flex-1">
          {name && <div className="text-xl font-semibold">Bem-vindo, {name}!</div>}
        </div>

        {/* Foto e botão de logout à direita */}
        <div className="flex items-center space-x-4">
          {profilePicture ? (
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image 
                src={profilePicture} 
                alt="Foto de perfil" 
                width={48} 
                height={48} 
                layout="fixed" 
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-500"></div>
          )}

          {name && (
            <button 
              onClick={logout} 
              className="p-2 text-red-500 hover:text-red-600 transition-colors duration-300 ease-in-out"
              aria-label="Logout"
            >
              <AiOutlineLogout className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Mensagem de sucesso de carregamento com fade out */}
      {showSuccessMessage && (
        <div
          className={`fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50 transition-opacity duration-1500 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          Projetos carregados com sucesso!
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {projects.length === 0 ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Seus Projetos</h1>
            <p>Aqui você pode gerenciar seus projetos e tarefas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full max-w-6xl justify-start">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out aspect-w-1 aspect-h-1">
                  <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
                  <p className="text-gray-300">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
