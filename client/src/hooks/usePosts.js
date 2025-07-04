import { useState, useEffect } from 'react';
import api from '../services/api';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    const res = await api.post('/posts', postData);
    await fetchPosts(); // Refresh list
    return res.data;
  };

  const deletePost = async (id) => {
    await api.delete(`/posts/${id}`);
    await fetchPosts();
  };

  const updatePost = async (id, updatedData) => {
    const res = await api.put(`/posts/${id}`, updatedData);
    await fetchPosts();
    return res.data;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    createPost,
    deletePost,
    updatePost,
    refreshPosts: fetchPosts,
  };
};

export default usePosts;
