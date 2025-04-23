import React from 'react';
import { styles } from '../styles/styles';
import { teamColors } from '../styles/teamColors';
import mmLogo from '../assets/mmLogo.png';
import { marchMadnessTeams } from '../data/marchMadnessTeams';
import { teamConferences } from '../data/teamConferences';
import { conferenceLogos } from '../data/conferenceLogos';

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

  const PlayerCard = ({ player, index }) => {
    const conference = teamConferences[player.Team];
    const conferenceLogo = conferenceLogos[conference];
    const teamColor = teamColors[player.Team] || "#1f1f1f";

    return (
      <div
        key={index}
        style={{
          position: 'relative',
          width: '180px',
          height: '280px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: teamColor,
          borderRadius: '8px',
          padding: '0.5rem',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s',
          fontSize: '0.9rem',
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
                objectFit: 'contain',
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
        <h3 style={{...styles.outlinedText, fontSize: '1rem', margin: '0.25rem 0'}}>{player["Player Name"]}</h3>
        <p style={{...styles.outlinedText, margin: '0.15rem 0'}}><strong>Team:</strong> {player["Team"]}</p>
        <p style={{...styles.outlinedText, margin: '0.15rem 0'}}><strong>Pos:</strong> {player["Pos"]}</p>
        <p style={{...styles.outlinedText, margin: '0.15rem 0'}}>PTS: {player["PTS"]}</p>
        <p style={{...styles.outlinedText, margin: '0.15rem 0'}}>FG%: {player["FG%"]} | FT%: {player["FT%"]}</p>
        <p style={{...styles.outlinedText, margin: '0.15rem 0'}}>3P%: {player["3P%"]}</p>
        <p style={{...styles.outlinedText, margin: '0.15rem 0'}}>REB: {player["REB"]} | AST: {player["AST"]}</p>
        <p style={{...styles.outlinedText, margin: '0.15rem 0'}}>STL: {player["STL"]} | BLK: {player["BLK"]}</p>
        <p style={{ 
          marginTop: "0.5rem", 
          fontWeight: "bold", 
          fontSize: "1.1rem", 
          textShadow: styles.outlinedText.textShadow,
          color: player["OVR_Grade"] >= 80 ? '#ffd700' : '#fff'
        }}>
          {renderOVRSymbol(player["OVR_Grade"])} OVR: {player["OVR_Grade"]}
        </p>
      </div>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Your Final Team</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 180px)',
        gap: '2rem',
        padding: '1.5rem',
        justifyContent: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {team.map((player, i) => (
          <PlayerCard player={player} index={i} />
        ))}
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