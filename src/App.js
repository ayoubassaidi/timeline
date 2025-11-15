import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import PostForm from './components/PostForm';
import Post from './components/Post';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPostsFromCookies();
  }, []);

  useEffect(() => {
    savePostsToCookies(posts);
  }, [posts]);

  const loadPostsFromCookies = () => {
    const savedPosts = Cookies.get('timelinePosts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts([]);
      }
    }
  };

  const savePostsToCookies = (postsData) => {
    Cookies.set('timelinePosts', JSON.stringify(postsData), { expires: 365 });
  };

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const createPost = (postData) => {
    const newPost = {
      id: generateId(),
      author: postData.author,
      message: postData.message,
      createdAt: new Date().toISOString(),
      comments: []
    };
    setPosts([newPost, ...posts]);
  };

  const updatePost = (postId, updatedData) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, message: updatedData.message } 
        : post
    ));
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const createComment = (postId, commentData) => {
    const newComment = {
      id: generateId(),
      author: commentData.author,
      message: commentData.message,
      createdAt: new Date().toISOString()
    };
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
  };

  const updateComment = (postId, commentId, updatedData) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, message: updatedData.message }
                : comment
            )
          }
        : post
    ));
  };

  const deleteComment = (postId, commentId) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? {
            ...post,
            comments: post.comments.filter(comment => comment.id !== commentId)
          }
        : post
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Timeline</h1>
      </header>
      
      <main className="App-main">
        <PostForm onSubmit={createPost} />
        
        <div className="posts-container">
          {posts.length === 0 ? (
            <p className="no-posts">No posts yet. Create your first post!</p>
          ) : (
            posts.map(post => (
              <Post
                key={post.id}
                post={post}
                onUpdate={updatePost}
                onDelete={deletePost}
                onCreateComment={createComment}
                onUpdateComment={updateComment}
                onDeleteComment={deleteComment}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
