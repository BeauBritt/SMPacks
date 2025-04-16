import React from 'react';
import { styles } from '../styles/styles';
import { teamColors } from '../styles/theme';

export const Team = ({ team, onSaveTeam, onNewTeam }) => {
  const getAverageOVR = () => {
    const total = team.reduce((sum, p) => sum + (p["OVR_Grade"] || 0), 0);
    return (total / team.length).toFixed(1);
  };

  const renderOVRSymbol = (ovr) => {
    if (ovr >= 78) return "⭐";
    if (ovr <= 73 && ovr >= 60) return "🗑️";
    return "";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Your Final Team</h2>
      <div style={styles.teamGrid}>
        {team.map((player, i) => {
          const teamColor = teamColors[player["Team"]] || "#1f1f1f";
          const ovr = player["OVR_Grade"];

          return (
            <div
              key={i}
              style={{
                ...styles.teamCard,
                backgroundColor: teamColor,
              }}
            >
              <h3 style={styles.outlinedText}>{player["Player Name"]}</h3>
              <p style={styles.outlinedText}><strong>Team:</strong> {player["Team"]}</p>
              <p style={styles.outlinedText}><strong>Pos:</strong> {player["Pos"]}</p>
              <p style={styles.outlinedText}>PTS: {player["PTS"]}</p>
              <p style={styles.outlinedText}>FG%: {player["FG%"]} | FT%: {player["FT%"]}</p>
              <p style={styles.outlinedText}>3P%: {player["3P%"]}</p>
              <p style={styles.outlinedText}>REB: {player["REB"]} | AST: {player["AST"]}</p>
              <p style={styles.outlinedText}>STL: {player["STL"]} | BLK: {player["BLK"]}</p>
              <p style={{ 
                marginTop: "0.5rem", 
                fontWeight: "bold", 
                fontSize: "1.1rem", 
                textShadow: styles.outlinedText.textShadow 
              }}>
                {renderOVRSymbol(ovr)} OVR: {ovr}
              </p>
            </div>
          );
        })}
      </div>
      <h3 style={{ marginTop: "2rem" }}>🏆 Team Average OVR: {getAverageOVR()}</h3>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button
          style={styles.button}
          onClick={onSaveTeam}
        >
          💾 Save Team
        </button>

        <button
          style={{ ...styles.button, backgroundColor: "#6c757d" }}
          onClick={onNewTeam}
        >
          🔄 Start New Team
        </button>
      </div>
    </div>
  );
}; 