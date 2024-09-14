import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TaskStatistics {
  todo: number;
  inProgress: number;
  done: number;
}

interface UserProfileProps {
  userId: string;
}

interface User {
  id: string;
  name: string;
  profilePicture?: {
    data: number[];
    type: string;
  };
  taskStatistics: TaskStatistics;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('Fetching user with ID:', userId);
        const response = await fetch(`http://localhost:3001/api/users/${userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched user data:', data);
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p className="text-center text-lg text-gray-400">Loading...</p>;

  if (!user) return <p className="text-center text-lg text-gray-400">Usuário não encontrado</p>;

  const profilePictureSrc = user.profilePicture
    ? `data:${user.profilePicture.type};base64,${Buffer.from(user.profilePicture.data).toString('base64')}`
    : '';

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-900 text-white">
      <div className="max-w-3xl w-full bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center mb-6"> 
          {user.profilePicture ? (
            <div className="relative w-24 h-24">
              <Image
                src={profilePictureSrc}
                alt={`${user.name}'s profile`}
                width={96}
                height={96}
                layout="fixed"
                className="rounded-full border-4 border-blue-600 object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <h1 className="text-4xl font-bold text-gray-100 mt-12">{user.name}</h1>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-4 text-gray-300">Estatísticas de Tarefas</h2>
          <p className="text-lg mb-2"><strong>Todo:</strong> {user.taskStatistics.todo}</p>
          <p className="text-lg mb-2"><strong>Em Andamento:</strong> {user.taskStatistics.inProgress}</p>
          <p className="text-lg"><strong>Concluídas:</strong> {user.taskStatistics.done}</p>
        </div>
      </div>
      <div className="mt-6">
        <Link href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Voltar para Home
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
