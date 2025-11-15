import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import './Post.css';

function Post({ post, onUpdate, onDelete, onCreateComment, onUpdateComment, onDeleteComment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(post.message);

  const handleUpdate = () => {
    if (!editMessage.trim()) {
      alert('Message cannot be empty');
      return;
    }
    onUpdate(post._id, { message: editMessage.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditMessage(post.message);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post._id);
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
    <div className="post">
      <div className="post-header">
        <strong>{post.author}</strong>
        <span className="post-date">{formatDate(post.createdAt)}</span>
      </div>
      
      {isEditing ? (
        <div className="post-edit">
          <textarea
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            className="form-textarea"
            rows="3"
          />
          <div className="post-edit-actions">
            <button onClick={handleUpdate} className="btn btn-success">
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="post-content">
          <p>{post.message}</p>
          <div className="post-actions">
            <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      )}

      {post.comments && post.comments.length > 0 && (
        <div className="comments-section">
          {post.comments.map(comment => (
            <Comment
              key={comment._id}
              comment={comment}
              postId={post._id}
              onUpdate={onUpdateComment}
              onDelete={onDeleteComment}
            />
          ))}
        </div>
      )}

      <CommentForm 
        postId={post._id}
        onSubmit={onCreateComment}
      />
    </div>
  );
}

export default Post;
