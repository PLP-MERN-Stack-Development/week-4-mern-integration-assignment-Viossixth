import { useState, useEffect } from 'react';
import api from '../services/api';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (name) => {
    const res = await api.post('/categories', { name });
    await fetchCategories(); // Refresh list
    return res.data;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    createCategory,
    refreshCategories: fetchCategories,
  };
};

export default useCategories;
