import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const fetchComments = async () => {
    const res = await axiosInstance.get(`/posts/${id}/comments`);
    setComments(res.data);
  };

  const fetchLikes = async () => {
    const res = await axiosInstance.get(`/posts/${id}/likes`);
    setLikeCount(res.data.likeCount);
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${id}`);
        setPost(res.data);
        await fetchComments();
        await fetchLikes();
      } catch (err) {
        setError('Could not load this post.');
        console.error(err);
      }
    };
    loadPost();
  }, [id]);

  const handleLike = async () => {
    try {
      await axiosInstance.post(`/posts/${id}/likes`);
      await fetchLikes();
    } catch (err) {
      setError('Could not update like.');
      console.error(err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/posts/${id}/comments`, { content: newComment });
      setNewComment('');
      await fetchComments();
    } catch (err) {
      setError('Could not add comment.');
      console.error(err);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await axiosInstance.delete(`/posts/${id}`);
      navigate('/');
    } catch (err) {
      setError('Could not delete post.');
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/posts/${id}/comments/${commentId}`);
      await fetchComments();
    } catch (err) {
      setError('Could not delete comment.');
      console.error(err);
    }
  };

  if (error && !post) return <p style={{ padding: '24px' }}>{error}</p>;
  if (!post) return <p style={{ padding: '24px' }}>Loading...</p>;

  const isAuthor = user && post.author.email === user.email;

    return (
    <div className="container">
      <div className="card">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <small className="meta">
          By {post.author.name} · {new Date(post.createdAt).toLocaleDateString()}
        </small>

        <div className="actions">
          {user ? (
            <button onClick={handleLike}>♥ Like / Unlike</button>
          ) : (
            <span><Link to="/login">Log in</Link> to like this post</span>
          )}
          <span className="meta">{likeCount} likes</span>

          {isAuthor && (
            <>
              <Link to={`/posts/${id}/edit`}>Edit</Link>
              <button className="btn-danger" onClick={handleDeletePost}>Delete</button>
            </>
          )}
        </div>
      </div>

      <h3>Comments ({comments.length})</h3>

      {user ? (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p><Link to="/login">Log in</Link> to comment</p>
      )}

      {comments.map((comment) => (
        <div key={comment.id} className="card comment">
          <p>{comment.content}</p>
          <small className="meta">
            {comment.author.name} · {new Date(comment.createdAt).toLocaleDateString()}
          </small>
          {user && user.email === comment.author.email && (
            <button className="btn-danger btn-small" onClick={() => handleDeleteComment(comment.id)}>
              Delete
            </button>
          )}
        </div>
      ))}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default PostDetail;