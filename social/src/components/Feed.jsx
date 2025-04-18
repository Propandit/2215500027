import { useState, useEffect } from 'react';
import { PostCard } from './PostCard';

function Feed({ posts, users, comments }) {
  const [sortedPosts, setSortedPosts] = useState([]);
  
  useEffect(() => {
    if (posts.length > 0) {
      // Sort posts by ID (assuming higher ID means newer post)
      const newSortedPosts = [...posts]
        .sort((a, b) => b.id - a.id)
        .map(post => ({
          ...post,
          author: users[post.userid],
          commentCount: comments[post.id] ? comments[post.id].length : 0,
        }));
      
      setSortedPosts(newSortedPosts);
    }
  }, [posts, users, comments]);
  
  return (
    <div className="feed-container">
      <h2>Latest Posts</h2>
      {sortedPosts.length > 0 ? (
        <div className="posts-grid">
          {sortedPosts.map(post => (
            <PostCard 
              key={post.id}
              post={post}
              author={post.author}
              commentCount={post.commentCount}
              postComments={comments[post.id] || []}
              users={users}
            />
          ))}
        </div>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

export default Feed;