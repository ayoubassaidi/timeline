import React, { useState, useEffect } from 'react';
import './App.css';
import PostForm from './components/PostForm';
import Post from './components/Post';

const API_URL = 'http://localhost:3001/api';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post');
    }
  };

  const updatePost = async (postId, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      const updatedPost = await response.json();
      setPosts(posts.map(post => post._id === postId ? updatedPost : post));
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Failed to update post');
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    }
  };

  const createComment = async (postId, commentData) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      if (!response.ok) {
        throw new Error('Failed to create comment');
      }
      const updatedPost = await response.json();
      setPosts(posts.map(post => post._id === postId ? updatedPost : post));
    } catch (err) {
      console.error('Error creating comment:', err);
      alert('Failed to create comment');
    }
  };

  const updateComment = async (postId, commentId, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
      const updatedPost = await response.json();
      setPosts(posts.map(post => post._id === postId ? updatedPost : post));
    } catch (err) {
      console.error('Error updating comment:', err);
      alert('Failed to update comment');
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      const updatedPost = await response.json();
      setPosts(posts.map(post => post._id === postId ? updatedPost : post));
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Failed to delete comment');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Timeline</h1>
      </header>
      
      <main className="App-main">
        <PostForm onSubmit={createPost} />
        
        {loading && <p>Loading posts...</p>}
        {error && <p className="error">Error: {error}</p>}
        
        <div className="posts-container">
          {posts.map(post => (
            <Post
              key={post._id}
              post={post}
              onUpdate={updatePost}
              onDelete={deletePost}
              onCreateComment={createComment}
              onUpdateComment={updateComment}
              onDeleteComment={deleteComment}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
