import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }
        const data = await response.json();
        setUser(data);
        setName(data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert("Account deleted successfully.");
          router.push('/');
        } else {
          alert("Failed to delete account. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Error deleting account. Please try again.");
      }
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    if (password) {
      formData.append('password', password);
    }

    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert("Profile updated successfully.");
        setEditMode(false);
        const updatedUser = await response.json();
        setUser(updatedUser);
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-400 dark:text-gray-600">Loading...</p>;

  if (!user) return <p className="text-center text-lg text-gray-400 dark:text-gray-600">User not found</p>;

  const profilePictureSrc = user.profilePicture
    ? `data:${user.profilePicture.type};base64,${Buffer.from(user.profilePicture.data).toString('base64')}`
    : '';

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex flex-row items-start mb-8 space-x-8">
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32">
              {user.profilePicture ? (
                <Image
                  src={profilePictureSrc}
                  alt={`${user.name}'s profile`}
                  width={128}
                  height={128}
                  layout="fixed"
                  className="rounded-full border-4 border-blue-500 dark:border-blue-300 object-cover"
                  aria-labelledby="profile-picture"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 text-2xl font-bold">
                  No Image
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center flex-grow space-y-4">
            <h1 id="profile-name" className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{user.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{user.id}</p>
          </div>
          <div className="flex flex-col space-y-4">
            {editMode ? (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Name:</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="profile-picture" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture:</label>
                  <input
                    id="profile-picture"
                    type="file"
                    onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                    className="w-full text-sm text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg"
                    aria-describedby="file-upload-help"
                  />
                  <p id="file-upload-help" className="text-gray-500 dark:text-gray-400 text-sm">Select a profile picture to upload.</p>
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">New Password:</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                    aria-required="true"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-200 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="w-full px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white dark:text-gray-200 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white dark:text-gray-200 rounded-lg hover:bg-green-600 dark:hover:bg-green-500 transition"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white dark:text-gray-200 rounded-lg hover:bg-red-600 dark:hover:bg-red-500 transition"
                >
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Link href="/" className="inline-block px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-200 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
