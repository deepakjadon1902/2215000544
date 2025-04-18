export interface User {
  id: number;
  username: string;
  name: string;
  avatar?: string;
  commentCount: number;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  timestamp: string;
}

export interface Post {
  id: number;
  user: User;
  content: string;
  comments: Comment[];
  timestamp: string;
  imageUrl?: string;
}