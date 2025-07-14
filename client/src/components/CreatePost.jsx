import React, { useState } from "react";
import api from "../api";
import styles from "./CreatePost.module.css";

const CreatePost = ({ onPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);
    await api.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setContent("");
    setImage(null);
    setLoading(false);
    if (onPost) onPost();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={2}
      />
      <div className={styles.actions}>
        <input type="file" accept="image/*" onChange={handleImage} />
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
};

export default CreatePost; 