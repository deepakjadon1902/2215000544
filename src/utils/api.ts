import { User, Post, Comment } from '../types';

const API_URL = 'http://localhost:3000';

// Mock data for users when API is unavailable
const MOCK_USERS: User[] = [
  {
    id: 1,
    username: 'johndoe',
    name: 'John Doe',
    commentCount: 5
  },
  {
    id: 2,
    username: 'janedoe',
    name: 'Jane Doe',
    commentCount: 8
  },
  {
    id: 3,
    username: 'techguru',
    name: 'Tech Guru',
    commentCount: 12
  },
  {
    id: 4,
    username: 'techman',
    name: 'Tech  Man',
    commentCount: 15
  },
  {
    id: 5,
    username: 'techhub',
    name: 'Tech  Hub',
    commentCount: 10
  }
];

// Mock data for comments
const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    user: MOCK_USERS[0],
    content: 'Great insights! Thanks for sharing.',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 2,
    user: MOCK_USERS[1],
    content: 'This is really helpful information.',
    timestamp: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 3,
    user: MOCK_USERS[2],
    content: 'Interesting perspective on this topic.',
    timestamp: new Date(Date.now() - 10800000).toISOString()
  },
  {
    id: 4,
    user: MOCK_USERS[3],
    content: 'Interesting perspective on this topic.',
    timestamp: new Date(Date.now() - 10800000).toISOString()
  },
  {
    id: 5,
    user: MOCK_USERS[4],
    content: 'Interesting perspective on this topic.',
    timestamp: new Date(Date.now() - 10800000).toISOString()
  }
];

// Curated image collection
const CURATED_IMAGES = [
  'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg', // Galaxy
  'https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg', // Baby Elephant
  'https://images.pexels.com/photos/434090/pexels-photo-434090.jpeg', // cat
  'https://images.pexels.com/photos/1770918/pexels-photo-1770918.jpeg', // Aurora
  'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg', // Elephant
  'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg' // Sunset
];

// Mock data for posts when API is unavailable
const MOCK_POSTS: Post[] = [
  {
    id: 1,
    user: MOCK_USERS[0],
    content: 'Just witnessed the most beautiful moonrise! 🌕 #nightsky #moon',
    comments: MOCK_COMMENTS.slice(0, 2),
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    imageUrl: CURATED_IMAGES[0]
  },
  {
    id: 2,
    user: MOCK_USERS[1],
    content: 'Met this adorable baby elephant today! Look at those eyes! 🐘 #wildlife #cute',
    comments: MOCK_COMMENTS,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    imageUrl: CURATED_IMAGES[1]
  },
  {
    id: 3,
    user: MOCK_USERS[2],
    content: 'Morning at the farm with this little one 🐄 #farm #animals',
    comments: MOCK_COMMENTS.slice(1),
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    imageUrl: CURATED_IMAGES[2]
  },
  {
    id: 4,
    user: MOCK_USERS[4],
    content: 'Morning at the Forest with this big one 🐘 #wildlife #cute',
    comments: MOCK_COMMENTS.slice(1),
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    imageUrl: CURATED_IMAGES[4]
  },
  {
    id: 5,
    user: MOCK_USERS[0],
    content: 'Morning at the Farm with this little one  #farm #animals',
    comments: MOCK_COMMENTS.slice(1),
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    imageUrl: CURATED_IMAGES[5]
  },
];

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const users = await response.json();
    
    return users.map((user: User) => ({
      ...user,
      commentCount: user.commentCount || 0
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    console.info('Using mock users data since API is unavailable');
    return MOCK_USERS;
  }
};

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const posts = await response.json();
    
    return posts.map((post: Post, index: number) => ({
      ...post,
      imageUrl: CURATED_IMAGES[index % CURATED_IMAGES.length]
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    console.info('Using mock posts data since API is unavailable');
    return MOCK_POSTS;
  }
};