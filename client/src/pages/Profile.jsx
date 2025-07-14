import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import styles from "./Profile.module.css";

function getInitial(name) {
  return name ? name[0].toUpperCase() : "?";
}

const Profile = () => {
  const { id } = useParams();
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const fileInput = useRef();

  const isOwnProfile = !id || (user && user.id === Number(id));

  const fetchProfile = async () => {
    const res = await api.get(`/users/${id || user.id}`);
    setProfile(res.data);
    setUsername(res.data.username);
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, [id, user]);

  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    if (avatar) formData.append("avatar", avatar);
    const res = await api.put(`/users/${profile.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setProfile(res.data);
    setEditing(false);
    setAvatar(null);
    if (isOwnProfile) updateProfile(res.data);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className={styles.profileBg}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          {profile.profile_picture
            ? <img src={profile.profile_picture.startsWith("http") ? profile.profile_picture : `http://localhost:5000${profile.profile_picture}`} alt="avatar" />
            : <span>{getInitial(profile.username)}</span>
          }
        </div>
        {editing ? (
          <form className={styles.form} onSubmit={handleSave}>
            <input
              className={styles.input}
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInput}
              onChange={handleAvatar}
            />
            <button className={styles.button} type="submit">Save</button>
            <button className={styles.button} type="button" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <div className={styles.username}>{profile.username}</div>
            {isOwnProfile && (
              <button className={styles.button} onClick={() => setEditing(true)}>Edit Profile</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile; 