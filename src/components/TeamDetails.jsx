import React from 'react';
import { styles } from '../styles/styles';
import { teamColors } from '../styles/theme';
import mmLogo from '../assets/mmLogo.png';
import { marchMadnessTeams } from '../data/marchMadnessTeams';
import { teamConferences } from '../data/teamConferences';
import { conferenceLogos } from '../data/conferenceLogos';

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

  const PlayerCard = ({ player }) => {
    const conference = teamConferences[player.Team];
    const conferenceLogo = conferenceLogos[conference];
    const teamColor = teamColors[player.Team] || "#1f1f1f";

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: teamColor,
          borderRadius: '8px',
          padding: '1rem',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s',
        }}
      >
        {conferenceLogo && (
          <div
            style={{
              position: 'absolute',
              top: '0.15rem',
              left: '0.5rem',
              width: '25px',
              height: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              padding: '0.15rem',
              backgroundColor: 'white',
              boxShadow: '0 0 4px rgba(0,0,0,0.3)',
              zIndex: 1
            }}
          >
            <img
              src={conferenceLogo}
              alt={`${conference} logo`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
        )}
        {isMarchMadnessPlayer(player.Team) && (
          <div style={{
            position: 'absolute',
            top: '0.15rem',
            right: '0.5rem',
            width: '25px',
            height: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '0.15rem',
            boxShadow: '0 0 4px rgba(0,0,0,0.3)',
            zIndex: 1
          }}>
            <img
              src={mmLogo}
              alt="March Madness"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
        )}
        <h3 style={styles.outlinedText}>{player["Player Name"]}</h3>
        <p style={styles.outlinedText}><strong>Team:</strong> {player.Team}</p>
        <p style={styles.outlinedText}><strong>Pos:</strong> {player.Pos}</p>
        <p style={styles.outlinedText}><strong>OVR:</strong> {player.OVR_Grade || 'N/A'} {renderOVRSymbol(player.OVR_Grade)}</p>
        <p style={styles.outlinedText}><strong>PTS:</strong> {player.PTS || 'N/A'}</p>
        <p style={styles.outlinedText}><strong>REB:</strong> {player.REB || 'N/A'}</p>
        <p style={styles.outlinedText}><strong>AST:</strong> {player.AST || 'N/A'}</p>
        <p style={styles.outlinedText}><strong>STL:</strong> {player.STL || 'N/A'}</p>
        <p style={styles.outlinedText}><strong>FG%:</strong> {player["FG%"] || 'N/A'}%</p>
        <p style={styles.outlinedText}><strong>3P%:</strong> {player["3P%"] || 'N/A'}%</p>
      </div>
    );
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
                <PlayerCard player={player} />
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