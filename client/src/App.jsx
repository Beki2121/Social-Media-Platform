import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Feed from './pages/Feed.jsx';
import Profile from './pages/Profile.jsx';
import axios from './api/axios';

function App() {
  const [apiUp, setApiUp] = useState(true);

  useEffect(() => {
    // Test API connectivity on mount
    axios.get('/auth/login') // This will 404 but should connect
      .then(() => setApiUp(true))
      .catch(() => setApiUp(false));
  }, []);

  return (
    <AuthProvider>
      {!apiUp && (
        <div style={{ background: '#d32f2f', color: '#fff', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>
          Backend API is unreachable. Please check your server.
        </div>
      )}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Feed />} />
          <Route path="/profile/:id" element={<Profile />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
