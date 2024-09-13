"use client";

import React from 'react';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';

const Home = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      {!isAuthenticated ? (
        <div>
          <Link href="/auth/login">
            <button>Login</button>
          </Link>
          <Link href="/auth/sign-up">
            <button>Sign Up</button>
          </Link>
        </div>
      ) : (
        <div>
          <p>Bem-vindo, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
