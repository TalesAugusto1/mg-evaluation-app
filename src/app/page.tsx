"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import NavBar from '@/components/NavBar';
import MainContent from '@/components/MainContent';
import { Project } from '@/types/project';
import Link from 'next/link';

const Home = () => {
  const { isAuthenticated, userId } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    console.log('Home - isAuthenticated:', isAuthenticated);
    console.log('Home - userId:', userId);

    if (isAuthenticated && userId) {
      fetch(`http://localhost:3001/api/projects?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched projects:', data);
          if (Array.isArray(data)) {
            setProjects(data);
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
      {isAuthenticated && <NavBar projects={projects} />}
      <MainContent projects={projects}>
        {!isAuthenticated ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Nosso Site</h1>
            <p className="mb-4">Aqui você pode gerenciar seus projetos e tarefas de forma eficiente.</p>
            <p className="mb-4">Faça login ou cadastre-se para começar a usar todas as funcionalidades.</p>
            <div className="space-x-4">
              <Link href="/auth/login">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
              </Link>
              <Link href="/auth/sign-up">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Sign Up</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            
          </div>
        )}
      </MainContent>
    </div>
  );
};

export default Home;
