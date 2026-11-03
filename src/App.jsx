import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
  path="/posts/:id/edit"
  element={
    <ProtectedRoute>
      <EditPost />
    </ProtectedRoute>
  }
/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;