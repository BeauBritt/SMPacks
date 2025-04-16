import React, { useState, useEffect } from 'react';
import { styles } from '../styles/styles';
import { teamColors } from '../styles/teamColors';

export const SavedTeams = ({ username, onClose }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Fetching teams for username:', username);
        const response = await fetch(`https://backend-sq7r.onrender.com/user/user_teams/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to fetch teams: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received teams data:', data);
        
        if (Array.isArray(data)) {
          setTeams(data);
        } else if (data.players) {
          setTeams([data]);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchTeams();
    }
  }, [username]);

  const getAverageOVR = (team) => {
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

  if (loading) {
    return (
      <div style={styles.fullPageCentered}>
        <div style={{ color: '#fff', fontSize: '1.5rem' }}>Loading your teams...</div>
      </div>
    );
  }

  if (selectedTeam) {
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
              onClick={() => setSelectedTeam(null)}
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
            {selectedTeam.map((player, index) => (
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
                    {renderOVRSymbol(player.OVR_Grade)} {player.OVR_Grade}
                  </span>
                </div>
                
                <div style={{ color: '#aaa', marginBottom: '0.5rem' }}>
                  {player.Team} • {player.Pos}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}>
                  <div style={{ color: '#fff' }}>
                    <span style={{ color: '#aaa' }}>PTS:</span> {player.PTS}
                  </div>
                  <div style={{ color: '#fff' }}>
                    <span style={{ color: '#aaa' }}>REB:</span> {player.REB}
                  </div>
                  <div style={{ color: '#fff' }}>
                    <span style={{ color: '#aaa' }}>AST:</span> {player.AST}
                  </div>
                  <div style={{ color: '#fff' }}>
                    <span style={{ color: '#aaa' }}>STL:</span> {player.STL}
                  </div>
                  <div style={{ color: '#fff' }}>
                    <span style={{ color: '#aaa' }}>FG%:</span> {player['FG%']}%
                  </div>
                  <div style={{ color: '#fff' }}>
                    <span style={{ color: '#aaa' }}>3P%:</span> {player['3P%']}%
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
              Team Average OVR: {getAverageOVR(selectedTeam)}
            </div>
          </div>
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
          <h2 style={{ color: '#fff', margin: 0 }}>Your Saved Teams</h2>
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

        {teams.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#aaa' }}>
            <p>You haven't saved any teams yet.</p>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {teams.map((teamData, index) => (
              <div
                key={index}
                onClick={() => setSelectedTeam(teamData.players || teamData.team)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ color: '#fff', fontSize: '1.1rem' }}>
                    Team #{index + 1}
                  </div>
                  <div style={{ color: '#4CAF50', fontSize: '1.1rem' }}>
                    Avg OVR: {teamData.avgOVR || getAverageOVR(teamData.players || teamData.team)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 