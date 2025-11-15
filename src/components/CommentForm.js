import React, { useState } from 'react';
import './CommentForm.css';

function CommentForm({ postId, onSubmit }) {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim() || !author.trim()) {
      alert('Please fill in both fields');
      return;
    }

    onSubmit(postId, {
      author: author.trim(),
      message: message.trim()
    });

    setMessage('');
    setAuthor('');
  };

  return (
    <div className="comment-form-container">
      <h3>Post a comment</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="This is a comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="2"
        />
        <button type="submit">Post a comment</button>
      </form>
    </div>
  );
}

export default CommentForm;
