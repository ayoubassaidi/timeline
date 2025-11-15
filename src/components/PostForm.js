import React, { useState } from 'react';
import './PostForm.css';

function PostForm({ onSubmit }) {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim() || !author.trim()) {
      alert('Please fill in both fields');
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="This is my message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
        />
        <button type="submit">Post a message</button>
      </form>
    </div>
  );
}

export default PostForm;
