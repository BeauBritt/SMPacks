import React, { useState } from "react";
import packImage from "./assets/pack.png";
import logoImage from "./assets/smlogo.png"; 

export default function App() {
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const [pack, setPack] = useState([]);
  const [opened, setOpened] = useState(false);
  const [team, setTeam] = useState([]);
  const [packCount, setPackCount] = useState(0);

  const handleAuth = async (mode) => {
    const endpoint = mode === "login" ? "/login" : "/register";
    try {
      const res = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.username);
        setFormData({ username: "", password: "" });
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  const openPack = () => {
    if (team.length >= 12) return;
    fetch("http://127.0.0.1:5000/random_players")
      .then((res) => res.json())
      .then((data) => {
        setPack(data);
        setOpened(true);
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const selectPlayer = (player) => {
    setTeam([...team, player]);
    setPack([]);
    setOpened(false);
    setPackCount(packCount + 1);
  };

  const getAverageOVR = () => {
    const total = team.reduce((sum, p) => sum + (p["OVR_Grade"] || 0), 0);
    return (total / team.length).toFixed(1);
  };

  if (!user) {
    return (
      <div style={styles.splitScreen}>
        <div style={styles.leftPane}>
          <div style={styles.centeredBox}>
            <h1>Shining Moment Packs</h1>
            <div style={{ marginBottom: "1rem" }}>
              <button onClick={() => setAuthMode("login")} style={styles.button}>
                Login
              </button>
              <button onClick={() => setAuthMode("register")} style={styles.button}>
                Register
              </button>
            </div>

            <div style={{ maxWidth: "300px", width: "100%", margin: "0 auto" }}>
              <input
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                style={styles.input}
              />
              <input
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={styles.input}
              />
              <button onClick={() => handleAuth(authMode)} style={styles.button}>
                {authMode === "login" ? "Login" : "Register"}
              </button>
            </div>
          </div>
        </div>

        <div style={styles.rightPane}>
          <img src={logoImage} alt="Logo" style={styles.logoImage} />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.fullScreen}>
      <div style={styles.centeredBox}>
        <h1>Welcome, {user}!</h1>
        <h2>Pack Game - Pick a Player ({team.length}/12)</h2>

        {team.length < 12 ? (
          <>
            {!opened ? (
              <button onClick={openPack} style={{ border: "none", background: "none" }}>
                <img src={packImage} alt="pack" style={{ width: "200px", cursor: "pointer" }} />
              </button>
            ) : (
              <div>
                <h3>Your Pack:</h3>
                <div style={styles.cardContainer}>
                  {pack.map((player, i) => (
                    <div key={i} style={styles.card} onClick={() => selectPlayer(player)}>
                      <h3>{player["Player Name"]}</h3>
                      <p><strong>Team:</strong> {player["Team"]}</p>
                      <p><strong>Pos:</strong> {player["Pos"]}</p>
                      <p style={{ fontStyle: "italic" }}>(Click to Select)</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <h2>Your Final Team</h2>
            <div style={styles.cardContainer}>
              {team.map((player, i) => (
                <div key={i} style={styles.card}>
                  <h3>{player["Player Name"]}</h3>
                  <p><strong>Team:</strong> {player["Team"]}</p>
                  <p><strong>Position:</strong> {player["Pos"]}</p>
                  <p>PTS: {player["PTS"]}</p>
                  <p>FG%: {player["FG%"]} | FT%: {player["FT%"]}</p>
                  <p>3P%: {player["3P%"]}</p>
                  <p>REB: {player["REB"]} | AST: {player["AST"]}</p>
                  <p>STL: {player["STL"]} | BLK: {player["BLK"]}</p>
                  <p><strong>OVR Grade:</strong> {player["OVR_Grade"]}</p>
                </div>
              ))}
            </div>
            <h3 style={{ marginTop: "2rem" }}>🏆 Team Average OVR: {getAverageOVR()}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  splitScreen: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#1f1f1f",
    color: "#fff",
  },
  leftPane: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  rightPane: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    position: "relative",
    overflow: "hidden",
  },
  
  logoWrapper: {
    position: "absolute",
    right: "5%",
    top: "50%",
    transform: "translateY(-50%)",
    maxHeight: "90vh",
  },
  
  logoImage: {
    width: "100%",
    maxWidth: "500px",
    height: "auto",
    objectFit: "contain",
    boxShadow: "0 0 30px rgba(0,0,0,0.6)", 
    borderRadius: "12px", 
  },
  
  
  fullScreen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#1f1f1f",
    color: "#fff",
    padding: "2rem",
    boxSizing: "border-box",
  },
  centeredBox: {
    textAlign: "center",
    maxWidth: "600px",
    width: "100%",
  },
  button: {
    padding: "0.7rem 1.2rem",
    margin: "0.5rem",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "8px",
    backgroundColor: "#3f51b5",
    color: "#fff",
    border: "none",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "0.6rem",
    margin: "0.5rem 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    marginTop: "1rem",
  },
  card: {
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "8px",
    width: "220px",
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
    cursor: "pointer",
  },
};







