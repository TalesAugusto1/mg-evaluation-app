import React from 'react';
import { useAuth } from '@/context/authContext';
import { Project } from '@/types/project';
import Link from 'next/link';
import Image from 'next/image';

interface MainContentProps {
  children: React.ReactNode;
  projects: Project[];
}

const MainContent: React.FC<MainContentProps> = ({ children, projects }) => {
  const { name, profilePicture, logout } = useAuth();
  console.log(profilePicture)

  return (
    <div className="flex-1 flex flex-col bg-black text-white relative">
      {/* Header */}
      <div className="flex justify-between items-center w-full p-4 bg-gray-900">
        {/* Nome do usuário */}
        {name && <div className="text-xl">Bem-vindo, {name}!</div>}
        
        {/* Foto de perfil */}
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

        {/* Botão de logout */}
        {name && (
          <button 
            onClick={logout} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {children}

        {/* Lista de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="hover:underline">
              <div className="bg-gray-800 p-4 rounded shadow-md cursor-pointer hover:bg-gray-700">
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <p>{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
