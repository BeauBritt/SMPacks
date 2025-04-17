import React from 'react';
import { styles } from '../styles/styles';
import { teamColors } from '../styles/theme';
import { marchMadnessTeams } from '../data/marchMadnessTeams';

export const Team = ({ team, onSaveTeam, onNewTeam, onReturnToLeaderboard }) => {
  const getAverageOVR = () => {
    const total = team.reduce((sum, p) => sum + (p["OVR_Grade"] || 0), 0);
    return (total / team.length).toFixed(1);
  };

  const renderOVRSymbol = (ovr) => {
    if (!ovr) return '❓';
    const num = parseFloat(ovr);
    if (num >= 90) return '⭐';
    if (num >= 80) return '🌟';
    if (num >= 70) return '✨';
    return '🗑️';
  };

  const isMarchMadnessPlayer = (team) => {
    return marchMadnessTeams.includes(team);
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
                position: 'relative'
              }}
            >
              {isMarchMadnessPlayer(player["Team"]) && (
                <div style={{
                  position: 'absolute',
                  top: '0.25rem',
                  right: '0.25rem',
                  backgroundColor: '#FFD700',
                  color: '#000',
                  padding: '0.15rem 0.3rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  zIndex: 1,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  letterSpacing: '0.05em'
                }}>
                  MM
                </div>
              )}
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
                textShadow: styles.outlinedText.textShadow,
                color: ovr >= 80 ? '#ffd700' : '#fff'
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

        <button
          style={{ ...styles.button, backgroundColor: "#4CAF50" }}
          onClick={onReturnToLeaderboard}
        >
          🏆 Return to Leaderboard
        </button>
      </div>
    </div>
  );
}; 