import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     api.get('/posts')
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load post');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`/api/posts/${id}`)
      .then(() => {
        alert('Post deleted');
        navigate('/');
      })
      .catch(() => alert('Failed to delete post'));
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.category && <p><strong>Category:</strong> {post.category.name}</p>}
      <button onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <br />
      <Link to="/">Back to posts</Link>
    </div>
  );
}

export default SinglePost;
