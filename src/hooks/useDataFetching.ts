import { useState, useEffect, useCallback } from 'react';
import { User, Post } from '../types';
import { fetchUsers, fetchPosts } from '../utils/api';

export function useUserData() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  return { users, loading, error, refreshUsers };
}

export function usePostData() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  // Set up polling for new posts (for the feed)
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshPosts();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(intervalId);
  }, [refreshPosts]);

  return { posts, loading, error, refreshPosts };
}