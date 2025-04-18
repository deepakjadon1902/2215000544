import React from 'react';
import { useUserData } from '../hooks/useDataFetching';
import { getTopUsers } from '../utils/helpers';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Trophy } from 'lucide-react';

const TopUsers: React.FC = () => {
  const { users, loading, error, refreshUsers } = useUserData();
  const topUsers = getTopUsers(users, 5);

  if (loading && users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600">Loading top users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p>{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          onClick={refreshUsers}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Trophy className="text-yellow-500 w-6 h-6 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">Top Users</h1>
      </div>
      
      {topUsers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500">No user data available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {topUsers.map((user, index) => (
            <UserCard key={user.id} user={user} rank={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopUsers;