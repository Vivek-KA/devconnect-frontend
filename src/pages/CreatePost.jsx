import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/posts', { title, content });
      navigate(`/posts/${response.data.id}`);
    } catch (err) {
      setError('Could not create post. Try logging in again.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '24px auto', padding: '0 16px' }}>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <textarea
            placeholder="Write your post..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: '100%', minHeight: '150px' }}
          />
        </div>
        <button type="submit">Publish</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CreatePost;