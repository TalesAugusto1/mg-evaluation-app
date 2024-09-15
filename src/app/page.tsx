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
    <div className="min-h-screen flex">
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
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl font-bold mb-8">Bem-vindo!</h1>
          <p className="mb-4">Faça login ou crie uma conta para acessar seus projetos.</p>
          <div className="flex space-x-4">
            <Link href="/auth/login">
              <p className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600">Login</p>
            </Link>
            <Link href="/auth/sign-up">
              <p className="bg-green-500 text-white p-3 rounded hover:bg-green-600">Sign Up</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
