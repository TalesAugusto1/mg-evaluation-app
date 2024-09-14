// src/utils/withAuth.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authContext';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthWrapper: React.FC = (props) => {
    const { isAuthenticated, userId } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
      // Espera o contexto estar carregado para decidir o redirecionamento
      if (!isAuthenticated && userId === undefined) {
        router.push('/login');
      }
    }, [isAuthenticated, userId, router]);

    if (!isAuthenticated && userId === undefined) {
      return <div>Loading...</div>; // Pode mostrar um spinner ou mensagem de carregamento
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
