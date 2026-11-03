import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        setError('Could not load post.');
        console.error(err);
      }
    };
    loadPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/posts/${id}`, { title, content });
      navigate(`/posts/${id}`);
    } catch (err) {
      setError('Could not update post. You can only edit your own posts.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '24px auto', padding: '0 16px' }}>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: '100%', minHeight: '150px' }}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default EditPost;