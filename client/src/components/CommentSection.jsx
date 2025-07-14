import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import styles from "./CommentSection.module.css";

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    const res = await api.get(`/posts/${postId}/comments`);
    setComments(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await api.post(`/posts/${postId}/comments`, { text });
    setText("");
    fetchComments();
  };

  return (
    <div className={styles.comments}>
      <div className={styles.title}>Comments</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        comments.map((c) => (
          <div key={c.id} className={styles.comment}>
            <span className={styles.username}>{c.username}:</span> {c.text}
          </div>
        ))
      )}
      {user && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write a comment..."
          />
          <button className={styles.button} type="submit">Post</button>
        </form>
      )}
    </div>
  );
};

export default CommentSection; 