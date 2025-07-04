import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../services/api';
import usePosts from '../hooks/usePosts';

function PostList() {
  const { posts, loading, error } = usePosts();
  
  useEffect(() => {
    api.get('/posts')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load posts');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Posts</h2>
      {posts.length === 0 ? <p>No posts yet.</p> : (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/create">Create New Post</Link>
    </div>
  );
}

export default PostList;
