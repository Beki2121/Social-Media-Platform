import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Post from '../components/Post.jsx';
import CreatePost from '../components/CreatePost.jsx';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get('/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      <CreatePost onPost={fetchPosts} />
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
} 