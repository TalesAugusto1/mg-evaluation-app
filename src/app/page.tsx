"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import NavBar from '@/components/NavBar';
import MainContent from '@/components/MainContent';
import { Project } from '@/types/project';
import Link from 'next/link';

const Home = () => {
  const { isAuthenticated, userId } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetch(`http://localhost:3001/api/projects?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setProjects(data);
            setNotification('Projetos carregados com sucesso!');
            setTimeout(() => setNotification(''), 5000);
          } else {
            console.error('Data fetched is not an array');
            setProjects([]);
          }
        })
        .catch(error => {
          console.error('Failed to fetch projects:', error);
          setProjects([]);
        });
    } else {
      setProjects([]);
    }
  }, [isAuthenticated, userId]);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {isAuthenticated && userId ? (
        <>
          <NavBar projects={projects} />
          <div className="flex-1 flex flex-col">
            <MainContent projects={projects}>
              {notification && (
                <div className="bg-green-500 text-white p-4 rounded mb-4 transition-opacity duration-150 ease-in-out">
                  {notification}
                </div>
              )}
              {projects.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                  <h1 className="text-4xl font-bold mb-8">Seus Projetos</h1>
                  <p className="mb-4">Aqui você pode gerenciar seus projetos e tarefas.</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                  <h1 className="text-4xl font-bold mb-8">Projetos</h1>
                  <p className="mb-4">Aqui você pode visualizar e gerenciar seus projetos.</p>
                </div>
              )}
            </MainContent>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col p-4 bg-gray-900">
          {/* Botões no canto superior direito */}
          <div className="absolute top-4 right-4 flex space-x-4">
            <Link href="/auth/login">
              <p className="px-6 py-3 w-32 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-all">
                Login
              </p>
            </Link>
            <Link href="/auth/sign-up">
              <p className="px-6 py-3 w-32 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition-all">
                Sign Up
              </p>
            </Link>
          </div>

          {/* Conteúdo em duas colunas */}
          <div className="flex flex-col md:flex-row items-center justify-center min-h-full space-y-8 md:space-y-0 md:space-x-16">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-8">Bem-vindo ao MG-Projects!</h1>
              <p className="text-lg mb-8">
                Gerencie seus projetos e tarefas de maneira eficiente e colaborativa.
                Cadastre-se agora e comece a organizar seus projetos com facilidade.
              </p>
            </div>

            <div className="md:w-1/2 mt-8 md:mt-0">
              <h2 className="text-2xl font-semibold text-center md:text-left">Por que escolher o MG-Projects?</h2>
              <ul className="list-disc mt-4 space-y-2 text-left">
                <li>Organize seus projetos em um só lugar</li>
                <li>Colabore com sua equipe em tempo real</li>
                <li>Acompanhe o progresso de cada tarefa de forma visual</li>
                <li>Interface simples e intuitiva</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
