import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import styles from "./PostCard.module.css";
import CommentSection from "./CommentSection";

function getInitial(name) {
  return name ? name[0].toUpperCase() : "?";
}

const PostCard = ({ post, onLikeChange }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);

  // Use userAvatar or profile_picture for avatar
  const avatar = post.userAvatar || post.profile_picture;

  // Use backend values for like/unlike counts and status
  const likeStatus = post.userLikeStatus;
  const likeCount = post.likeCount;
  const unlikeCount = post.unlikeCount;

  const handleLike = async (type) => {
    if (!user) return;
    if (likeStatus === type) {
      // Remove like/unlike
      await api.delete(`/posts/${post.id}/likes`);
    } else {
      await api.post(`/posts/${post.id}/likes`, { type });
    }
    if (onLikeChange) onLikeChange(); // Refetch posts from backend
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {avatar
            ? <img src={avatar.startsWith("http") ? avatar : `http://localhost:5000${avatar}`} alt="avatar" />
            : <span>{getInitial(post.username)}</span>
          }
        </div>
        <div>
          <Link to={`/profile/${post.userId}`} className={styles.username}>{post.username}</Link>
          <div className={styles.date}>{post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}</div>
        </div>
      </div>
      <div className={styles.content}>{post.content}</div>
      {post.image && (
        <img className={styles.image} src={post.image.startsWith("http") ? post.image : `http://localhost:5000${post.image}`} alt="post" />
      )}
      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${likeStatus === "like" ? styles.active : ""}`}
          onClick={() => handleLike("like")}
          title="Like"
        >
          {likeStatus === "like" ? <FaThumbsUp /> : <FaRegThumbsUp />}
          <span>{likeCount}</span>
        </button>
        <button
          className={`${styles.actionBtn} ${likeStatus === "unlike" ? styles.active : ""}`}
          onClick={() => handleLike("unlike")}
          title="Unlike"
        >
          {likeStatus === "unlike" ? <FaThumbsDown /> : <FaRegThumbsDown />}
          <span>{unlikeCount}</span>
        </button>
        <button className={styles.commentBtn} onClick={() => setShowComments((v) => !v)}>
          4ac Comments
        </button>
      </div>
      {showComments && <CommentSection postId={post.id} />}
    </div>
  );
};

export default PostCard; 