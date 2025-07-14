import React, { useEffect, useState, useCallback } from "react";
import api from "../api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import styles from "./Feed.module.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use useCallback to ensure fetchPosts reference is stable
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await api.get("/posts");
    setPosts(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className={styles.feedBg}>
      <div className={styles.feed}>
        <CreatePost onPost={fetchPosts} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} onLikeChange={fetchPosts} />
          ))
        )}
      </div>
    </div>
  );
};

export default Feed; 