// Displays the global leaderboard with team rankings and allows viewing team details
import React, { useState, useEffect } from 'react';
import { styles } from '../styles/styles';
import { TeamDetails } from './TeamDetails';
import { SavedTeams } from './SavedTeams';

export const Leaderboard = ({ leaderboard, onStartGame, onRefreshLeaderboard }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showSavedTeams, setShowSavedTeams] = useState(false);
  const [loading, setLoading] = useState(false);

  // Refresh leaderboard when saved teams modal is closed
  useEffect(() => {
    if (!showSavedTeams && onRefreshLeaderboard) {
      onRefreshLeaderboard();
    }
  }, [showSavedTeams, onRefreshLeaderboard]);

  const handleTeamClick = async (entry) => {
    setLoading(true);
    try {
      console.log('Clicked entry:', entry);
      console.log('Fetching teams for username:', entry.username);
      
      const response = await fetch(`https://backend-sq7r.onrender.com/user/user_teams/${entry.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received teams data:', data);
      
      // Find the team with matching avgOVR
      const matchingTeam = Array.isArray(data) 
        ? data.find(team => team.avgOVR === entry.avgOVR)
        : (data.avgOVR === entry.avgOVR ? data : null);
      
      if (!matchingTeam) {
        throw new Error('No team found with matching average OVR');
      }
      
      const teamData = matchingTeam.players || matchingTeam.team;
      if (!teamData) {
        throw new Error('No team data found in matching team');
      }
      
      setSelectedTeam(teamData);
    } catch (error) {
      console.error('Error fetching team:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.fullPageCentered}>
      <div style={{ maxWidth: '800px', width: '100%', padding: '2rem' }}>
        <h1 style={{ color: '#fff', textAlign: 'center', marginBottom: '2rem' }}>🏆 Leaderboard</h1>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <button
            style={styles.button}
            onClick={onStartGame}
          >
            🎮 Open Pack
          </button>
          
          <button
            style={{ ...styles.button, backgroundColor: '#4CAF50' }}
            onClick={() => setShowSavedTeams(true)}
          >
            📋 View Saved Teams
          </button>
        </div>

        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '1rem',
          overflow: 'auto',
          maxHeight: '60vh'
        }}>
          {leaderboard.slice(0, 10).map((entry, index) => (
            <div
              key={index}
              onClick={() => handleTeamClick(entry)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                marginBottom: '0.5rem',
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
              <div style={{ color: '#fff', fontSize: '1.1rem' }}>
                {index + 1}. {entry.username}
              </div>
              <div style={{ color: '#4CAF50', fontSize: '1.1rem' }}>
                Avg OVR: {entry.avgOVR}
              </div>
            </div>
          ))}
        </div>
      </div>

      {loading && (
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
          zIndex: 1000
        }}>
          <div style={{ color: '#fff', fontSize: '1.5rem' }}>Loading team details...</div>
        </div>
      )}

      {selectedTeam && (
        <TeamDetails
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />
      )}

      {showSavedTeams && (
        <SavedTeams
          username={localStorage.getItem('username')}
          onClose={() => setShowSavedTeams(false)}
        />
      )}
    </div>
  );
}; 