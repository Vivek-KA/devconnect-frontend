import { Link } from 'react-router-dom';

function PostCard({ post }) {
  const preview =
    post.content.length > 150 ? post.content.slice(0, 150) + '...' : post.content;

  return (
    <div className="card post-card">
      <Link to={`/posts/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p className="post-content">{preview}</p>
      <small className="meta">
        By {post.author.name} · {new Date(post.createdAt).toLocaleDateString()}
      </small>
    </div>
  );
}

export default PostCard;