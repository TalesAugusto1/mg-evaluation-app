"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import NavBar from '@/components/NavBar';
import MainContent from '@/components/MainContent';
import { Project } from '@/types/project';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa'; // Ícone para o carregamento

const Home = () => {
  const { isAuthenticated, userId, name } = useAuth(); // Adicionado name para exibir no NavBar
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && userId) {
      setLoading(true); // Inicia o estado de carregamento
      setError(null); // Reseta o erro ao tentar carregar novamente

      fetch(`http://localhost:3001/api/projects?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setProjects(data);
          } else {
            setError('Erro ao carregar os projetos.');
            setProjects([]);
          }
        })
        .catch(() => {
          setError('Não foi possível carregar os projetos. Tente novamente mais tarde.');
          setProjects([]);
        })
        .finally(() => {
          setLoading(false); // Finaliza o estado de carregamento
        });
    } else {
      setProjects([]);
    }
  }, [isAuthenticated, userId]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {isAuthenticated ? (
        <>
          <NavBar projects={projects} userId={userId!} userName={name || ''} /> {/* Passa o nome do usuário para a NavBar */}
          <MainContent projects={projects}>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-8">Seus Projetos</h1>
              <p className="mb-4">Aqui você pode gerenciar seus projetos e tarefas.</p>
              {loading ? (
                <div className="flex justify-center">
                  <FaSpinner className="animate-spin text-3xl" />
                </div>
              ) : error ? (
                <div className="text-red-500">
                  <p>{error}</p>
                </div>
              ) : (
                <p>Projetos carregados com sucesso!</p>
              )}
            </div>
          </MainContent>
        </>
      ) : (
        <MainContent projects={projects}>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Nosso Site</h1>
            <p className="mb-4">Aqui você pode gerenciar seus projetos e tarefas de forma eficiente.</p>
            <p className="mb-4">Faça login ou cadastre-se para começar a usar todas as funcionalidades.</p>
            <div className="space-x-4">
              <Link href="/auth/login">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300">
                  Login
                </button>
              </Link>
              <Link href="/auth/sign-up">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-300">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </MainContent>
      )}
    </div>
  );
};

export default Home;
