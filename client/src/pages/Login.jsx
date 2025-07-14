import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const { login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ emailOrUsername, password });
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className={styles.loginBg}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className={styles.error}>{error}</div>}
        <input
          className={styles.input}
          value={emailOrUsername}
          onChange={e => setEmailOrUsername(e.target.value)}
          placeholder="Email or Username"
          required
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className={styles.button} type="submit">Login</button>
        <div>
          Don't have an account? <span className={styles.link} onClick={() => navigate("/register")}>Register</span>
        </div>
      </form>
    </div>
  );
};

export default Login; 