import React, { useState } from 'react';
import { styles } from '../styles/styles';
import { TeamDetails } from './TeamDetails';

export const Leaderboard = ({ leaderboard, onStartGame }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTeamClick = async (entry) => {
    console.log('Clicked entry:', entry);
    setLoading(true);
    try {
      console.log('Fetching team data for:', entry.username);
      const response = await fetch(`https://backend-sq7r.onrender.com/user/user_teams/${entry.username}`, {
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
        throw new Error(`Failed to fetch team data: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Team data received:', data);
      
      // The data is an array with a single object containing team/players
      if (Array.isArray(data) && data.length > 0) {
        const teamData = data[0];
        if (teamData.players) {
          setSelectedTeam(teamData.players);
        } else if (teamData.team) {
          setSelectedTeam(teamData.team);
        } else {
          console.error('No team data found in response:', teamData);
        }
      } else {
        console.error('Invalid data structure:', data);
      }
    } catch (error) {
      console.error('Error fetching team data:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    } finally {
      setLoading(false);
    }
  };

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
                onClick={() => handleTeamClick(entry)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "1.2rem",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
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
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1000
        }}>
          <div style={{ color: '#fff', fontSize: '1.5rem' }}>Loading team data...</div>
        </div>
      )}
      {selectedTeam && (
        <TeamDetails 
          team={selectedTeam} 
          onClose={() => setSelectedTeam(null)} 
        />
      )}
    </div>
  );
}; 