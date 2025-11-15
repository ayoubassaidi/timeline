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
    onUpdate(post.id, { message: editMessage.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditMessage(post.message);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Delete this post?')) {
      onDelete(post.id);
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
    <div className="post">
      <div className="post-header">
        <strong>{post.author} - {formatDate(post.createdAt)}</strong>
      </div>
      
      {isEditing ? (
        <div className="post-edit">
          <textarea
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            rows="4"
          />
          <div className="post-edit-actions">
            <button onClick={handleUpdate} className="btn-save">Save</button>
            <button onClick={handleCancel} className="btn-cancel">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="post-content">
          <p>{post.message}</p>
          <div className="post-actions">
            <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
            <button onClick={handleDelete} className="btn-delete">Delete</button>
          </div>
        </div>
      )}

      {post.comments && post.comments.length > 0 && (
        <div className="comments-section">
          {post.comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              postId={post.id}
              onUpdate={onUpdateComment}
              onDelete={onDeleteComment}
            />
          ))}
        </div>
      )}

      <CommentForm 
        postId={post.id}
        onSubmit={onCreateComment}
      />
    </div>
  );
}

export default Post;
