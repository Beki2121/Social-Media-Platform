import { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext.jsx';
import CommentSection from './CommentSection.jsx';
import styles from './Post.module.css';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_URL.replace('/api', '');

export default function Post({ post }) {
  const { user } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [editImage, setEditImage] = useState(post.image_url || '');

  useEffect(() => {
    const fetchLikes = async () => {
      const res = await axios.get(`/posts/${post.id}`);
      setLikeCount(res.data.likeCount || 0);
      setLiked(res.data.liked || false);
    };
    fetchLikes();
    const fetchComments = async () => {
      const res = await axios.get(`/comments/post/${post.id}`);
      setCommentCount(res.data.length);
    };
    fetchComments();
  }, [post.id]);

  const handleLike = async () => {
    if (!liked) {
      await axios.post(`/likes/post/${post.id}`);
      setLikeCount(likeCount + 1);
      setLiked(true);
    } else {
      await axios.delete(`/likes/post/${post.id}`);
      setLikeCount(likeCount - 1);
      setLiked(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setEditContent(post.content);
    setEditImage(post.image_url || '');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/posts/${post.id}`, { content: editContent, image_url: editImage });
    setEditing(false);
    window.location.reload();
  };

  // Avatar logic
  let avatarSrc = '';
  if (post.profile_picture) {
    if (post.profile_picture.startsWith('/uploads')) {
      avatarSrc = API_BASE + post.profile_picture;
    } else {
      avatarSrc = post.profile_picture;
    }
  }

  return (
    <div className={styles['post-root']}>
      <div className={styles['post-header']}>
        {avatarSrc ? (
          <img src={avatarSrc} alt="avatar" className={styles['post-avatar']} />
        ) : (
          <div className={styles['post-avatar']} style={{background:'#1877f2',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'1.1rem'}}>
            {post.username ? post.username.charAt(0).toUpperCase() : '?'}
          </div>
        )}
        <b className={styles['post-username']}>{post.username}</b> <span className={styles['post-date']}>{new Date(post.created_at).toLocaleString()}</span>
      </div>
      {editing ? (
        <form onSubmit={handleEditSubmit} className={styles['post-edit-form']}>
          <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className={styles['post-edit-content']} />
          <input value={editImage} onChange={e => setEditImage(e.target.value)} placeholder="Image URL (optional)" className={styles['post-edit-image']} />
          <div className={styles['post-edit-actions']}>
            <button type="submit" className={styles['post-edit-save']}>Save</button>
            <button type="button" onClick={() => setEditing(false)} className={styles['post-edit-cancel']}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles['post-content']}>{post.content}</div>
          {post.image_url && (
            <div className={styles['post-image-wrapper']}>
              <img
                src={`${API_BASE}${post.image_url}`}
                alt="post"
                className={styles['post-image']}
              />
            </div>
          )}
        </>
      )}
      <div className={styles['post-actions']}>
        <button onClick={handleLike} className={styles['post-like-btn'] + (liked ? ' ' + styles['liked'] : '')} aria-label={liked ? 'Unlike' : 'Like'}>
          {liked ? <FaThumbsUp style={{marginRight:4}} /> : <FaRegThumbsUp style={{marginRight:4}} />}
        </button>
        <span className={styles['post-like-count']}>{likeCount}</span>
        <button onClick={() => setShowComments(v => !v)} className={styles['post-comments-btn']}>
          {showComments ? 'Hide' : 'Show'} Comments ({commentCount})
        </button>
        {user && user.id === post.user_id && !editing && (
          <button onClick={handleEdit} className={styles['post-edit-btn']}>Edit</button>
        )}
      </div>
      {showComments && <CommentSection postId={post.id} />}
    </div>
  );
} 