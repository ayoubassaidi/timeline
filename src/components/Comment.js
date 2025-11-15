import React, { useState } from 'react';
import './Comment.css';

function Comment({ comment, postId, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(comment.message);

  const handleUpdate = () => {
    if (!editMessage.trim()) {
      alert('Comment cannot be empty');
      return;
    }
    onUpdate(postId, comment._id, { message: editMessage.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditMessage(comment.message);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      onDelete(postId, comment._id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{comment.author}</strong>
        <span className="comment-date">{formatDate(comment.createdAt)}</span>
      </div>
      
      {isEditing ? (
        <div className="comment-edit">
          <textarea
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            className="form-textarea"
            rows="2"
          />
          <div className="comment-edit-actions">
            <button onClick={handleUpdate} className="btn btn-success">
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="comment-content">
          <p>{comment.message}</p>
          <div className="comment-actions">
            <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
