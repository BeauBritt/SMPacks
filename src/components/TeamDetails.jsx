import React from 'react';
import { styles } from '../styles/styles';
import { teamColors } from '../styles/teamColors';

export const TeamDetails = ({ team, onClose }) => {
  const getAverageOVR = () => {
    if (!team || team.length === 0) return 0;
    const sum = team.reduce((acc, player) => acc + (player.OVR_Grade || 0), 0);
    return (sum / team.length).toFixed(1);
  };

  const renderOVRSymbol = (ovr) => {
    if (!ovr) return '❓';
    if (ovr >= 90) return '⭐';
    if (ovr >= 80) return '🌟';
    if (ovr >= 70) return '✨';
    return '🗑️';
  };

  const formatStat = (stat) => {
    if (stat === undefined || stat === null) return 'N/A';
    return stat;
  };

  if (!team || team.length === 0) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: '#1f1f1f',
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>No Team Data Available</h2>
          <p style={{ color: '#aaa' }}>The team data could not be loaded or is empty.</p>
          <button
            onClick={onClose}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#3f51b5',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#1f1f1f',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 0 20px rgba(0,0,0,0.4)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#fff', margin: 0 }}>Team Details</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {team.map((player, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '1rem',
                borderRadius: '8px',
                borderLeft: `4px solid ${teamColors[player.Team] || '#666'}`
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <h3 style={{ 
                  color: '#fff', 
                  margin: 0,
                  fontSize: '1.1rem'
                }}>
                  {player['Player Name'] || 'Unknown Player'}
                </h3>
                <span style={{
                  fontSize: '1.2rem',
                  color: player.OVR_Grade >= 80 ? '#ffd700' : '#fff'
                }}>
                  {renderOVRSymbol(player.OVR_Grade)} {formatStat(player.OVR_Grade)}
                </span>
              </div>
              
              <div style={{ color: '#aaa', marginBottom: '0.5rem' }}>
                {formatStat(player.Team)} • {formatStat(player.Pos)}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <div style={{ color: '#fff' }}>
                  <span style={{ color: '#aaa' }}>PTS:</span> {formatStat(player.PTS)}
                </div>
                <div style={{ color: '#fff' }}>
                  <span style={{ color: '#aaa' }}>REB:</span> {formatStat(player.REB)}
                </div>
                <div style={{ color: '#fff' }}>
                  <span style={{ color: '#aaa' }}>AST:</span> {formatStat(player.AST)}
                </div>
                <div style={{ color: '#fff' }}>
                  <span style={{ color: '#aaa' }}>STL:</span> {formatStat(player.STL)}
                </div>
                <div style={{ color: '#fff' }}>
                  <span style={{ color: '#aaa' }}>FG%:</span> {formatStat(player['FG%'])}%
                </div>
                <div style={{ color: '#fff' }}>
                  <span style={{ color: '#aaa' }}>3P%:</span> {formatStat(player['3P%'])}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ color: '#fff', fontSize: '1.2rem' }}>
            Team Average OVR: {getAverageOVR()}
          </div>
        </div>
      </div>
    </div>
  );
}; 