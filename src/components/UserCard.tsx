import React from 'react';
import { User } from '../types';

interface UserCardProps {
  user: User;
  rank: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, rank }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-4">
            <div className="relative">
              <div className={`absolute -top-1 -left-1 w-6 h-6 rounded-full ${
                rank === 1 ? 'bg-yellow-500' :
                rank === 2 ? 'bg-gray-300' :
                rank === 3 ? 'bg-amber-700' : 'bg-blue-500'
              } text-white flex items-center justify-center text-xs font-bold`}>
                {rank}
              </div>
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{user.name}</h3>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
          
          <div className="flex-shrink-0 ml-2">
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {user.commentCount} {user.commentCount === 1 ? 'comment' : 'comments'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;