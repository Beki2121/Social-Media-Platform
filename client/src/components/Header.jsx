import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Header.module.css";

function getInitial(name) {
  return name ? name[0].toUpperCase() : "?";
}

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>fakebook</div>
      {user && (
        <div className={styles.userSection}>
          <div
            className={styles.avatar}
            onClick={() => navigate(`/profile/${user.id}`)}
            title="Profile"
          >
            {user.profile_picture
              ? <img src={user.profile_picture.startsWith("http") ? user.profile_picture : `http://localhost:5000${user.profile_picture}`} alt="avatar" />
              : <span>{getInitial(user.username)}</span>
            }
          </div>
          <button className={styles.logout} onClick={logout}>Logout</button>
        </div>
      )}
      {!user && (
        <div>
          <Link to="/login" className={styles.link}>Login</Link>
          <Link to="/register" className={styles.link}>Register</Link>
        </div>
      )}
    </header>
  );
};

export default Header; 