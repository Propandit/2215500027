export function UserCard({ user, commentCount }) {
  return (
    <div className="user-card">
      <img 
        src={`/api/placeholder/100/100`} 
        alt={`${user.name}'s avatar`} 
        className="user-avatar" 
      />
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>Total Comments: <strong>{commentCount}</strong></p>
        <p>Posts: <strong>{user.posts ? user.posts.length : 0}</strong></p>
      </div>
    </div>
  );
}
