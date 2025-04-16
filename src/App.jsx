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
    if (team.length >= 12) return;
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
    const avgOVR = team.reduce((sum, p) => sum + (p["OVR_Grade"] || 0), 0) / team.length;
    try {
      const res = await fetch("https://backend-sq7r.onrender.com/user/save_team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user,
          team,
          avgOVR: parseFloat(avgOVR.toFixed(1)),
        }),
      });
      const data = await res.json();
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

  if (team.length >= 12) {
    return <Team team={team} onSaveTeam={saveTeam} onNewTeam={startNewTeam} />;
  }

  return (
    <div style={styles.fullPageCentered}>
      <Pack
        pack={pack}
        onSelectPlayer={selectPlayer}
        onOpenPack={openPack}
      />
    </div>
  );
}







