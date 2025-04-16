import React from 'react';
import { styles } from '../styles/styles';

export const Leaderboard = ({ leaderboard, onStartGame }) => {
  return (
    <div style={{ 
      padding: "2rem", 
      background: "#1f1f1f", 
      color: "#fff", 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{ 
        maxWidth: "800px", 
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(0,0,0,0.4)"
      }}>
        <h1 style={{ 
          fontSize: "2.5rem", 
          marginBottom: "2rem",
          textAlign: "center",
          color: "#fff"
        }}>🏆 Leaderboard</h1>
        
        <h2 style={{ 
          marginBottom: "1.5rem",
          textAlign: "center",
          color: "#fff"
        }}>Top Saved Teams</h2>
        
        {leaderboard.length === 0 ? (
          <p style={{ textAlign: "center" }}>Loading leaderboard data...</p>
        ) : (
          <div style={{ 
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}>
            {leaderboard.map((entry, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "1.2rem",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <span style={{ 
                    fontSize: "1.4rem", 
                    fontWeight: "bold",
                    minWidth: "3.5rem",
                    textAlign: "center",
                    color: "#fff"
                  }}>
                    #{i + 1}
                  </span>
                  <span style={{ 
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    color: "#fff"
                  }}>
                    {entry.username ?? "Unknown"}
                  </span>
                </div>
                <div style={{ 
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#4CAF50",
                  marginLeft: "2rem"
                }}>
                  Avg OVR: {entry.avgOVR ?? "?"}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onStartGame}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1.1rem",
            backgroundColor: "#3f51b5",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            width: "100%",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
          }}
        >
          🎮 Start Opening Packs
        </button>
      </div>
    </div>
  );
}; 