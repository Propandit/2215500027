
import { useState, useEffect } from 'react';
import { UserCard } from './UserCard';

function TopUsers({ users, posts, comments }) {
  const [topUsers, setTopUsers] = useState([]);
  
  useEffect(() => {
    if (Object.keys(users).length > 0 && posts.length > 0 && Object.keys(comments).length > 0) {
      // Calculate comment counts for each user's posts
      const userCommentCounts = {};
      
      posts.forEach(post => {
        const userId = post.userid;
        const postComments = comments[post.id] || [];
        
        if (!userCommentCounts[userId]) {
          userCommentCounts[userId] = 0;
        }
        
        userCommentCounts[userId] += postComments.length;
      });
      
      // Sort users by comment count and take top 5
      const sortedUsers = Object.keys(userCommentCounts)
        .sort((a, b) => userCommentCounts[b] - userCommentCounts[a])
        .slice(0, 5)
        .map(userId => ({
          id: userId,
          name: users[userId],
          commentCount: userCommentCounts[userId],
          // Get all posts for this user
          posts: posts.filter(post => post.userid.toString() === userId.toString())
        }));
      
      setTopUsers(sortedUsers);
    }
  }, [users, posts, comments]);
  
  return (
    <div className="top-users-container">
      <h2>Top 5 Users with Most Commented Posts</h2>
      {topUsers.length > 0 ? (
        <div className="user-list">
          {topUsers.map(user => (
            <UserCard 
              key={user.id}
              user={user}
              commentCount={user.commentCount}
            />
          ))}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default TopUsers;