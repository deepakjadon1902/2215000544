import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post } from '../types';
import { formatDate } from '../utils/helpers';
import { MessageSquare, Heart, Share2 } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  
  const toggleLike = () => setIsLiked(!isLiked);
  const toggleComments = () => setIsExpanded(!isExpanded);
  const toggleImageZoom = () => setIsImageZoomed(!isImageZoomed);
  
  // Ensure post.comments exists before trying to slice it
  const comments = post.comments || [];
  
  // Limit comment preview to 3 comments unless expanded
  const visibleComments = isExpanded 
    ? comments 
    : comments.slice(0, 2);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md mb-6"
    >
      {/* Post Header */}
      <div className="p-4 flex items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {post.user.avatar ? (
            <img 
              src={post.user.avatar} 
              alt={post.user.name} 
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg mr-3">
              {post.user.name.charAt(0)}
            </div>
          )}
        </motion.div>
        
        <div>
          <h3 className="font-medium text-gray-900">{post.user.name}</h3>
          <p className="text-xs text-gray-500">
            {formatDate(post.timestamp)}
          </p>
        </div>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
      </div>
      
      {/* Post Image */}
      {post.imageUrl && (
        <motion.div 
          className="relative aspect-video overflow-hidden bg-gray-100 cursor-pointer"
          onClick={toggleImageZoom}
          whileHover={{ scale: 1.02 }}
          layout
        >
          <motion.img 
            src={post.imageUrl} 
            alt="Post visual" 
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isImageZoomed ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            loading="lazy"
          />
        </motion.div>
      )}
      
      {/* Post Stats */}
      <div className="px-4 py-3 flex items-center text-sm text-gray-500 border-t border-gray-100">
        <div className="flex items-center mr-4">
          <span className="font-medium mr-1">{comments.length}</span>
          <span>comments</span>
        </div>
      </div>
      
      {/* Post Actions */}
      <div className="flex border-t border-gray-100">
        <motion.button 
          className={`flex-1 py-2 flex items-center justify-center text-sm font-medium transition-colors ${
            isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
          }`}
          onClick={toggleLike}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
          </motion.div>
          <span>Like</span>
        </motion.button>
        
        <motion.button 
          className="flex-1 py-2 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          onClick={toggleComments}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          <span>Comment</span>
        </motion.button>
        
        <motion.button 
          className="flex-1 py-2 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="w-5 h-5 mr-2" />
          <span>Share</span>
        </motion.button>
      </div>
      
      {/* Comments Section */}
      <AnimatePresence>
        {visibleComments.length > 0 && (
          <motion.div 
            className="border-t border-gray-100 bg-gray-50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {visibleComments.map((comment) => (
              <motion.div 
                key={comment.id} 
                className="p-3 border-b border-gray-100 last:border-b-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    {comment.user.avatar ? (
                      <img 
                        src={comment.user.avatar} 
                        alt={comment.user.name} 
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm mr-2">
                        {comment.user.name.charAt(0)}
                      </div>
                    )}
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.div 
                      className="bg-white rounded-lg px-3 py-2"
                      whileHover={{ scale: 1.01 }}
                    >
                      <h4 className="text-sm font-medium text-gray-900">{comment.user.name}</h4>
                      <p className="text-sm text-gray-800">{comment.content}</p>
                    </motion.div>
                    <div className="text-xs text-gray-500 mt-1 ml-1">
                      {formatDate(comment.timestamp)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {comments.length > 2 && !isExpanded && (
              <motion.button 
                className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                onClick={toggleComments}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View all {comments.length} comments
              </motion.button>
            )}
            
            {isExpanded && (
              <motion.button 
                className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                onClick={toggleComments}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Show less
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostCard;