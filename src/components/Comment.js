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
    onUpdate(postId, comment.id, { message: editMessage.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditMessage(comment.message);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Delete this comment?')) {
      onDelete(postId, comment.id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const day = date.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                   day === 2 || day === 22 ? 'nd' :
                   day === 3 || day === 23 ? 'rd' : 'th';
    return `${months[date.getMonth()]} ${day}${suffix} ${date.getFullYear()}`;
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{comment.author} - {formatDate(comment.createdAt)}</strong>
      </div>
      
      {isEditing ? (
        <div className="comment-edit">
          <textarea
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            rows="2"
          />
          <div className="comment-edit-actions">
            <button onClick={handleUpdate} className="btn-save">Save</button>
            <button onClick={handleCancel} className="btn-cancel">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="comment-content">
          <p>{comment.message}</p>
          <div className="comment-actions">
            <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
            <button onClick={handleDelete} className="btn-delete">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
