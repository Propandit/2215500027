import { useState } from 'react';

export function PostCard({ post, author, commentCount, postComments, users, trending }) {
  const [showComments, setShowComments] = useState(trending);
  
  return (
    <div className={`post-card ${trending ? 'trending' : ''}`}>
      <img 
        src={`/api/placeholder/300/200`} 
        alt="Post visual" 
        className="post-image" 
      />
      <div className="post-content">
        <h3>{post.content}</h3>
        <div className="post-meta">
          <span className="post-author">By: {author || 'Unknown User'}</span>
          <span className="post-id">Post ID: {post.id}</span>
        </div>
        
        <div className="post-stats">
          <span 
            className="comment-count" 
            onClick={() => setShowComments(!showComments)}
          >
            {commentCount} Comments {showComments ? '▼' : '►'}
          </span>
        </div>
        
        {showComments && commentCount > 0 && (
          <div className="comments-section">
            <h4>Comments:</h4>
            <ul className="comment-list">
              {postComments.map((comment) => (
                <li key={comment.id} className="comment">
                  <strong>{users[comment.userid] || 'Unknown User'}</strong>: {comment.content}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}