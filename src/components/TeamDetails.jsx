import React from 'react';
import { styles } from '../styles/styles';
import { teamColors } from '../styles/theme';
import { marchMadnessTeams } from '../data/marchMadnessTeams';

export const TeamDetails = ({ team, onClose }) => {
  if (!team || team.length === 0) {
    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <h2>No Team Data Available</h2>
          <button onClick={onClose} style={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    );
  }

  const getAverageOVR = () => {
    if (!team || team.length === 0) return 0;
    const sum = team.reduce((acc, player) => acc + (parseFloat(player.OVR_Grade) || 0), 0);
    return (sum / team.length).toFixed(1);
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
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Team Details</h2>
        <div style={styles.teamStats}>
          <p>Team Average OVR: {getAverageOVR()}</p>
        </div>
        <div style={styles.teamGrid}>
          {team.map((player, index) => {
            const teamColor = teamColors[player.Team] || "#1f1f1f";
            return (
              <div key={index} style={{ ...styles.teamCard, backgroundColor: teamColor, position: 'relative' }}>
                {isMarchMadnessPlayer(player.Team) && (
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
                <h3>{player["Player Name"]}</h3>
                <p><strong>Team:</strong> {player.Team}</p>
                <p><strong>Pos:</strong> {player.Pos}</p>
                <p><strong>OVR:</strong> {player.OVR_Grade || 'N/A'} {renderOVRSymbol(player.OVR_Grade)}</p>
                <p><strong>PTS:</strong> {player.PTS || 'N/A'}</p>
                <p><strong>REB:</strong> {player.REB || 'N/A'}</p>
                <p><strong>AST:</strong> {player.AST || 'N/A'}</p>
                <p><strong>STL:</strong> {player.STL || 'N/A'}</p>
                <p><strong>FG%:</strong> {player["FG%"] || 'N/A'}%</p>
                <p><strong>3P%:</strong> {player["3P%"] || 'N/A'}%</p>
              </div>
            );
          })}
        </div>
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}; 