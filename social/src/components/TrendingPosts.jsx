import { useState, useEffect } from 'react';
import { PostCard } from './PostCard';

function TrendingPosts({ posts, users, comments }) {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [maxCommentCount, setMaxCommentCount] = useState(0);
  
  useEffect(() => {
    if (posts.length > 0 && Object.keys(comments).length > 0) {
      // Calculate comment count for each post
      const postsWithCommentCount = posts.map(post => {
        const postComments = comments[post.id] || [];
        return {
          ...post,
          commentCount: postComments.length,
          author: users[post.userid]
        };
      });
      
      // Find maximum comment count
      const maxCount = Math.max(...postsWithCommentCount.map(post => post.commentCount));
      setMaxCommentCount(maxCount);
      
      // Filter posts with the maximum comment count
      const trending = postsWithCommentCount.filter(post => post.commentCount === maxCount);
      setTrendingPosts(trending);
    }
  }, [posts, users, comments]);
  
  return (
    <div className="trending-posts-container">
      <h2>Trending Posts</h2>
      <p className="trending-description">
        Posts with the highest number of comments ({maxCommentCount})
      </p>
      
      {trendingPosts.length > 0 ? (
        <div className="posts-grid">
          {trendingPosts.map(post => (
            <PostCard 
              key={post.id}
              post={post}
              author={post.author}
              commentCount={post.commentCount}
              postComments={comments[post.id] || []}
              users={users}
              trending={true}
            />
          ))}
        </div>
      ) : (
        <p>No trending posts available</p>
      )}
    </div>
  );
}

export default TrendingPosts;
