import React, { useEffect, useState } from 'react';
import { Post } from '../types';
import { usePostData } from '../hooks/useDataFetching';
import { sortPostsByTimestamp } from '../utils/helpers';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { RefreshCw } from 'lucide-react';

const Feed: React.FC = () => {
  const { posts, loading, error, refreshPosts } = usePostData();
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (posts.length > 0) {
      setSortedPosts(sortPostsByTimestamp(posts));
    }
  }, [posts]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshPosts();
    setTimeout(() => setIsRefreshing(false), 500); // Minimum animation time
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600">Loading feed...</p>
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
          onClick={refreshPosts}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Latest Posts</h1>
        <button 
          className={`flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors ${isRefreshing ? 'opacity-50' : ''}`}
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      {sortedPosts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500">No posts available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;