import React, { useState } from 'react';
import './PostForm.css';

function PostForm({ onSubmit }) {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim() || !author.trim()) {
      alert('Please fill in both author and message fields');
      return;
    }

    onSubmit({
      author: author.trim(),
      message: message.trim()
    });

    setMessage('');
    setAuthor('');
  };

  return (
    <div className="post-form-container">
      <h2>Post a message</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="form-input"
        />
        <textarea
          placeholder="What's on your mind?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-textarea"
          rows="3"
        />
        <button type="submit" className="btn btn-primary">
          Post a message
        </button>
      </form>
    </div>
  );
}

export default PostForm;
