import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import styles from "./Register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", { email, username, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className={styles.registerBg}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className={styles.error}>{error}</div>}
        <input
          className={styles.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className={styles.input}
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
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
        <button className={styles.button} type="submit">Register</button>
        <div>
          Already have an account? <span className={styles.link} onClick={() => navigate("/login")}>Login</span>
        </div>
      </form>
    </div>
  );
};

export default Register; 