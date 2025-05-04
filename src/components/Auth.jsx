// Handles user authentication with login and registration functionality
import React, { useState } from 'react';
import { styles } from '../styles/styles';
import logoImage from '../assets/smlogo.png';

export const Auth = ({ onAuth, onModeChange }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(formData);
  };

  return (
    <div style={styles.splitScreen}>
      <div style={styles.leftPane}>
        <div style={styles.centeredBox}>
          <h1>Shining Moment Packs</h1>
          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => onModeChange("login")} style={styles.button}>Login</button>
            <button onClick={() => onModeChange("register")} style={styles.button}>Register</button>
          </div>
          <form onSubmit={handleSubmit} style={{ maxWidth: "300px", width: "100%", margin: "0 auto" }}>
            <input
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              style={styles.input}
            />
            <input
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <div style={styles.rightPane}>
        <img src={logoImage} alt="Logo" style={styles.logoImage} />
      </div>
    </div>
  );
}; 