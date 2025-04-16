import React, { useState, useEffect } from "react";
import { Auth } from "./components/Auth";
import { Leaderboard } from "./components/Leaderboard";
import { Pack } from "./components/Pack";
import { Team } from "./components/Team";
import { styles } from "./styles/styles";

export default function App() {
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [pack, setPack] = useState([]);
  const [team, setTeam] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const maxPlayers = 12; // Maximum number of players in a team

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("https://backend-sq7r.onrender.com/user/leaderboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        if (res.ok) {
          const data = await res.json();
          console.log('Leaderboard data received:', data);
          setLeaderboard(data);
        } else {
          console.error("Failed to fetch leaderboard");
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    if (user) {
      fetchLeaderboard();
    }
  }, [user]);

  const handleAuth = async (formData) => {
    const endpoint = authMode === "login" ? "/user/login" : "/user/register";
    try {
      const res = await fetch(`https://backend-sq7r.onrender.com${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.username);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  const openPack = () => {
    if (team.length >= maxPlayers) return;
    fetch("https://backend-sq7r.onrender.com/random_players")
      .then((res) => res.json())
      .then((data) => {
        setPack(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const selectPlayer = (player) => {
    setTeam([...team, player]);
    setPack([]);
  };

  const saveTeam = async () => {
    console.log('Current team:', team);
    if (!team || team.length === 0) {
      alert('No team data to save!');
      return;
    }
    const avgOVR = team.reduce((sum, p) => sum + (p["OVR_Grade"] || 0), 0) / team.length;
    console.log('Saving team with data:', { username: user, team, avgOVR });
    try {
      const res = await fetch("https://backend-sq7r.onrender.com/user/save_team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user,
          team,
          avgOVR: parseFloat(avgOVR.toFixed(1)),
          players: team,
        }),
      });
      const data = await res.json();
      console.log('Server response:', data);
      if (res.ok) {
        alert("Team saved successfully!");
      } else {
        alert(data.error || "Failed to save team");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Could not connect to server.");
    }
  };

  const startNewTeam = () => {
    setTeam([]);
    setPack([]);
  };

  if (!user) {
    return <Auth onAuth={handleAuth} onModeChange={setAuthMode} />;
  }

  if (showLeaderboard) {
    return <Leaderboard leaderboard={leaderboard} onStartGame={() => setShowLeaderboard(false)} />;
  }

  if (team.length >= maxPlayers) {
    return <Team team={team} onSaveTeam={saveTeam} onNewTeam={startNewTeam} />;
  }

  return (
    <div style={styles.fullPageCentered}>
      <Pack
        pack={pack}
        onSelectPlayer={selectPlayer}
        onOpenPack={openPack}
        currentPlayers={team.length}
        maxPlayers={maxPlayers}
      />
    </div>
  );
}







