import React from 'react';
import { usePostData } from '../hooks/useDataFetching';
import { getTrendingPosts } from '../utils/helpers';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { TrendingUp } from 'lucide-react';

const TrendingPosts: React.FC = () => {
  const { posts, loading, error, refreshPosts } = usePostData();
  const trendingPosts = getTrendingPosts(posts);

  if (loading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600">Loading trending posts...</p>
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
      <div className="flex items-center mb-6">
        <TrendingUp className="text-purple-500 w-6 h-6 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">Trending Posts</h1>
      </div>
      
      {trendingPosts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500">No trending posts available yet. Check back soon!</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-4">
            Showing posts with {trendingPosts[0].comments.length} comments
          </p>
          <div className="space-y-4">
            {trendingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingPosts;