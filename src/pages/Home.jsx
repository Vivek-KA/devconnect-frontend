import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/posts');
        setPosts(response.data);
      } catch (err) {
        setError('Could not load posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p style={{ padding: '24px' }}>Loading posts...</p>;
  if (error) return <p style={{ padding: '24px' }}>{error}</p>;

   return (
    <div className="container">
      <h2>Latest Posts</h2>
      {posts.length === 0 ? (
        <p className="meta">No posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}

export default Home;