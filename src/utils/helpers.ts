import { Post, User } from '../types';

export const sortUsersByCommentCount = (users: User[]): User[] => {
  return [...users].sort((a, b) => b.commentCount - a.commentCount);
};

export const getTopUsers = (users: User[], count: number = 5): User[] => {
  const sortedUsers = sortUsersByCommentCount(users);
  return sortedUsers.slice(0, count);
};

export const sortPostsByCommentCount = (posts: Post[]): Post[] => {
  return [...posts].sort((a, b) => b.comments.length - a.comments.length);
};

export const getTrendingPosts = (posts: Post[]): Post[] => {
  if (!posts.length) return [];
  
  const sortedPosts = sortPostsByCommentCount(posts);
  const maxComments = sortedPosts[0].comments.length;
  
  // Return all posts that have the maximum number of comments
  return sortedPosts.filter(post => post.comments.length === maxComments);
};

export const sortPostsByTimestamp = (posts: Post[]): Post[] => {
  return [...posts].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // For recent dates (today), show time only
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  if (isToday) {
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
  // For recent dates (within the last week), show day and time
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);
  
  if (date > oneWeekAgo) {
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
  // For older dates, show full date
  return date.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};