import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import useCategories from '../hooks/useCategories';

function CreatePost() {
  const { categories, loading, error } = useCategories();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
     api.get('/posts')
      .then(res => setCategories(res.data))
      .catch(() => setError('Failed to load categories'));
  }, []);

const handleSubmit = (e) => {
  e.preventDefault();

  if (!title.trim() || !content.trim() || !categoryId) {
    setError('All fields are required');
    return;
  }

  setError(null);
  setLoading(true);

  api.post('/posts', { title, content, category: categoryId })
    .then(() => navigate('/'))
    .catch(() => setError('Failed to create post'))
    .finally(() => setLoading(false));
};


  return (
    <div>
      <h2>Create New Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Content:</label><br />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category:</label><br />
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>

      </form>
      <br />
      <Link to="/">Back to posts</Link>
    </div>
  );
}

export default CreatePost;
