"use client";

import React from 'react';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';

const Home = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Home Page</h1>
      {!isAuthenticated ? (
        <div className="space-x-4">
          <Link href="/auth/login">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
          </Link>
          <Link href="/auth/sign-up">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Sign Up</button>
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl mb-4">Bem-vindo, {user?.name}!</p>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
