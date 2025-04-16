import React, { useState } from "react";
import packImage from "./assets/pack.png";
import logoImage from "./assets/smlogo.png";
import flipSound from "./assets/flip.mp3";
import packRipSound from "./assets/packRip.mp3";


const teamColors = {
  "Abilene Christian": "#4F2C1D",
  "Air Force": "#003087",
  "Akron": "#002144",
  "Alabama": "#9E1B32",
  "Alabama A&M": "#68272D",
  "Alabama State": "#000000",
  "Albany": "#46166B",
  "Alcorn State": "#46166B",
  "American": "#C8102E",
  "Appalachian State": "#000000",
  "Arizona": "#CC0033",
  "Arizona State": "#8C1D40",
  "Arkansas": "#9D2235",
  "Arkansas State": "#D71920",
  "Arkansas-Pine Bluff": "#000000",
  "Army": "#D4BF91",
  "Auburn": "#0C2340",
  "Austin Peay": "#CC092F",
  "BYU": "#002E5D",
  "Ball State": "#BA0C2F",
  "Baylor": "#154734",
  "Bellarmine": "#5E001D",
  "Belmont": "#002D72",
  "Bethune-Cookman": "#8C2633",
  "Binghamton": "#006B3F",
  "Boise State": "#09347A",
  "Boston College": "#98002E",
  "Boston University": "#CC0000",
  "Bowling Green": "#402311",
  "Bradley": "#E50000",
  "Brown": "#4E3629",
  "Bryant": "#000000",
  "Bucknell": "#003087",
  "Buffalo": "#005BBB",
  "Butler": "#13294B",
  "Cal Poly": "#154734",
  "Cal State Bakersfield": "#0033A0",
  "Cal State Fullerton": "#00274C",
  "Cal State Northridge": "#CC0000",
  "California": "#003262",
  "California Baptist": "#0A2240",
  "Campbell": "#F47920",
  "Canisius": "#FFCC00",
  "Central Arkansas": "#4F2C1D",
  "Central Connecticut": "#003DA5",
  "Central Michigan": "#6A0032",
  "Charleston Southern": "#002855",
  "Charlotte": "#004C45",
  "Chattanooga": "#0C2340",
  "Chicago State": "#00685E",
  "Cincinnati": "#E00122",
  "Clemson": "#F56600",
  "Cleveland State": "#006A4D",
  "Coastal Carolina": "#008A93",
  "Colgate": "#862633",
  "College of Charleston": "#800000",
  "Colorado": "#CFB87C",
  "Colorado State": "#0F4D92",
  "Columbia": "#9BDDFF",
  "Connecticut": "#000E2F",
  "Coppin State": "#003DA5",
  "Cornell": "#B31B1B",
  "Creighton": "#005CA9",
  "Dartmouth": "#00693E",
  "Davidson": "#C8102E",
  "Dayton": "#CE1126",
  "DePaul": "#003DA5",
  "Delaware": "#00539B",
  "Delaware State": "#E03A3E",
  "Denver": "#8B0015",
  "Detroit Mercy": "#C8102E",
  "Drake": "#004477",
  "Drexel": "#07294D",
  "Duke": "#003087",
  "Duquesne": "#041E42",
  "East Carolina": "#592A8A",
  "East Tennessee State": "#041E42",
  "Eastern Illinois": "#003DA5",
  "Eastern Kentucky": "#7C2529",
  "Eastern Michigan": "#006633",
  "Eastern Washington": "#B31B1B",
  "Elon": "#8C1D40",
  "Evansville": "#522398",
  "FIU": "#081E3F",
  "Fairfield": "#E32636",
  "Fairleigh Dickinson": "#8C1D40",
  "Florida": "#0021A5",
  "Florida A&M": "#228748",
  "Florida Atlantic": "#003366",
  "Florida Gulf Coast": "#0066CC",
  "Florida State": "#782F40",
  "Fordham": "#990000",
  "Fresno State": "#183B8E",
  "Furman": "#4E2A84",
  "Gardner-Webb": "#C8102E",
  "George Mason": "#006633",
  "George Washington": "#041E42",
  "Georgetown": "#041E42",
  "Georgia": "#BA0C2F",
  "Georgia Southern": "#041E42",
  "Georgia State": "#0033A0",
  "Georgia Tech": "#B3A369",
  "Gonzaga": "#041E42",
  "Grambling State": "#F4C430",
  "Grand Canyon": "#522398",
  "Green Bay": "#1D252D",
  "Hampton": "#0033A0",
  "Harvard": "#A41034",
  "Hawaii": "#024731",
  "High Point": "#592A8A",
  "Hofstra": "#0055A4",
  "Holy Cross": "#522398",
  "Houston": "#C8102E",
  "Houston Christian": "#0033A0",
  "Howard": "#002147",
  "IUPUI": "#990000",
  "Idaho": "#B3A369",
  "Idaho State": "#F47920",
  "Illinois": "#E84A27",
  "Illinois State": "#BA0C2F",
  "Incarnate Word": "#BA0C2F",
  "Indiana": "#990000",
  "Indiana State": "#0033A0",
  "Iona": "#7C2529",
  "Iowa": "#000000",
  "Iowa State": "#C8102E",
  "Jackson State": "#002147",
  "Jacksonville": "#003E29",
  "Jacksonville State": "#BA0C2F",
  "James Madison": "#450084",
  "Kansas": "#0051BA",
  "Kansas City": "#002855",
  "Kansas State": "#512888",
  "Kennesaw State": "#ffc629",
  "Kent State": "#00205B",
  "Kentucky": "#0033A0",
  "LIU": "#000000",
  "La Salle": "#002855",
  "Lafayette": "#800000",
  "Lamar": "#E01E26",
  "Le Moyne": "#006747",
  "Lehigh": "#653819",
  "Liberty": "#A6192E",
  "Lincoln (PA)": "#003DA5",
  "Lipscomb": "#452C63",
  "Little Rock": "#5E001D",
  "Long Beach State": "#000000",
  "Longwood": "#002855",
  "Louisiana": "#CE181E",
  "Louisiana State": "#461D7C",
  "Louisiana Tech": "#003087",
  "Louisville": "#AD0000",
  "Loyola (MD)": "#0C7133",
  "Loyola Chicago": "#7C2529",
  "Loyola Marymount": "#AB0C2F",
  "Maine": "#003263",
  "Manhattan": "#00703C",
  "Marist": "#B31B1B",
  "Marquette": "#003366",
  "Marshall": "#00AC3E",
  "Maryland": "#E21833",
  "Maryland Eastern Shore": "#822433",
  "McNeese": "#00529B",
  "Memphis": "#003087",
  "Mercer": "#F76800",
  "Merrimack": "#0B335E",
  "Miami (FL)": "#F47321",
  "Miami (OH)": "#C41230",
  "Michigan": "#00274C",
  "Michigan State": "#18453B",
  "Middle Tennessee": "#005EB8",
  "Milwaukee": "#000000",
  "Minnesota": "#7A0019",
  "Mississippi State": "#5D1725",
  "Mississippi Valley State": "#046A38",
  "Missouri": "#F1B82D",
  "Missouri State": "#5E0009",
  "Monmouth": "#041E42",
  "Montana": "#660033",
  "Montana State": "#0D2C6C",
  "Morehead State": "#005EB8",
  "Morgan State": "#1B4383",
  "Mount St. Mary's": "#002855",
  "Murray State": "#002144",
  "NC State": "#CC0000",
  "NJIT": "#CC0033",
  "Navy": "#00205B",
  "Nebraska": "#D00000",
  "Nevada": "#003366",
  "New Hampshire": "#0033A0",
  "New Mexico": "#BA0C2F",
  "New Mexico State": "#841617",
  "New Orleans": "#0033A0",
  "Niagara": "#4B116F",
  "Nicholls": "#C8102E",
  "Norfolk State": "#007A33",
  "North Alabama": "#46166B",
  "North Carolina": "#4B9CD3",
  "North Carolina A&T": "#002D62",
  "North Carolina Central": "#990000",
  "North Dakota": "#009A44",
  "North Dakota State": "#FFC82D",
  "North Florida": "#003366",
  "North Texas": "#059033",
  "Northeastern": "#CC0000",
  "Northern Arizona": "#003466",
  "Northern Colorado": "#002147",
  "Northern Illinois": "#D50032",
  "Northern Iowa": "#46166B",
  "Northern Kentucky": "#FFC72C",
  "Northwestern": "#4E2A84",
  "Northwestern State": "#4D1979",
  "Notre Dame": "#0C2340",
  "Oakland": "#C5B783",
  "Ohio": "#0D6030",
  "Ohio State": "#BA0C2F",
  "Oklahoma": "#841617",
  "Oklahoma State": "#FF7300",
  "Old Dominion": "#1E3A5F",
  "Ole Miss": "#CE1126",
  "Omaha": "#000000",
  "Oral Roberts": "#002147",
  "Oregon": "#FEE123",
  "Oregon State": "#DC4405",
  "Pacific": "#FF6A00",
  "Penn": "#011F5B",
  "Penn State": "#002D62",
  "Pepperdine": "#00205B",
  "Pittsburgh": "#003594",
  "Portland": "#5E2A87",
  "Portland State": "#154734",
  "Prairie View A&M": "#46166B",
  "Presbyterian": "#005BAC",
  "Princeton": "#E77500",
  "Providence": "#000000",
  "Purdue": "#CFB991",
  "Queens": "#002147",
  "Quinnipiac": "#003366",
  "Radford": "#CE1126",
  "Rhode Island": "#6BA3DB",
  "Rice": "#00205B",
  "Richmond": "#990000",
  "Rider": "#862633",
  "Robert Morris": "#041E42",
  "Rutgers": "#CC0033",
  "SIU Edwardsville": "#E35205",
  "SMU": "#0033A0",
  "Sacramento State": "#043927",
  "Sacred Heart": "#C8102E",
  "Saint Francis (PA)": "#E35205",
  "Saint Joseph's": "#A6192E",
  "Saint Louis": "#003DA5",
  "Saint Mary's": "#C8102E",
  "Saint Peter's": "#002147",
  "Sam Houston": "#FF6A00",
  "Samford": "#0033A0",
  "San Diego": "#002147",
  "San Diego State": "#A6192E",
  "San Francisco": "#006747",
  "San Jose State": "#0055A2",
  "Santa Clara": "#A6192E",
  "Seattle U": "#C8102E",
  "Seton Hall": "#0055A2",
  "Siena": "#006747",
  "South Alabama": "#002147",
  "South Carolina": "#73000A",
  "South Carolina State": "#73000A",
  "South Dakota": "#C8102E",
  "South Dakota State": "#0033A0",
  "Southeast Missouri State": "#E32636",
  "Southeastern Louisiana": "#006747",
  "Southern": "#002147",
  "Southern California": "#990000",
  "Southern Illinois": "#660000",
  "Southern Indiana": "#002147",
  "Southern Mississippi": "#FFC72C",
  "Southern Utah": "#CE1126",
  "St. Bonaventure": "#6F4E37",
  "St. John's": "#C8102E",
  "St. Thomas": "#4E2A84",
  "Stanford": "#8C1515",
  "Stephen F. Austin": "#4E2A84",
  "Stetson": "#006747",
  "Stonehill": "#4E2A84",
  "Stony Brook": "#C8102E",
  "Syracuse": "#D44500",
  "TCU": "#4D1979",
  "Tarleton State": "#4D1979",
  "Temple": "#9D2235",
  "Tennessee": "#FF8200",
  "Tennessee State": "#0033A0",
  "Tennessee Tech": "#4F2683",
  "Texas": "#BF5700",
  "Texas A&M": "#500000",
  "Texas A&M-Commerce": "#002147",
  "Texas A&M-Corpus Christi": "#006747",
  "Texas Southern": "#500000",
  "Texas State": "#501214",
  "Texas Tech": "#CC0000",
  "The Citadel": "#002147",
  "Toledo": "#002147",
  "Towson": "#FFD700",
  "Troy": "#660000",
  "Tulane": "#006747",
  "Tulsa": "#0033A0",
  "UAB": "#006747",
  "UC Davis": "#002147",
  "UC Irvine": "#002147",
  "UC Riverside": "#002147",
  "UC San Diego": "#002147",
  "UC Santa Barbara": "#002147",
  "UCF": "#BA9B37",
  "UCLA": "#2774AE",
  "UIC": "#CE1126",
  "UL Monroe": "#660000",
  "UMBC": "#FFC72C",
  "UMass": "#881C1C",
  "UMass Lowell": "#002147",
  "UNC Asheville": "#002147",
  "North Dakota": "#009A44",
  "North Dakota State": "#FFC82D",
  "North Florida": "#003366",
  "North Texas": "#059033",
  "Northeastern": "#CC0000",
  "Northern Arizona": "#003466",
  "Northern Colorado": "#002147",
  "Northern Illinois": "#D50032",
  "Northern Iowa": "#46166B",
  "Northern Kentucky": "#FFC72C",
  "Northwestern": "#4E2A84",
  "Northwestern State": "#4D1979",
  "Notre Dame": "#0C2340",
  "Oakland": "#C5B783",
  "Ohio": "#0D6030",
  "Ohio State": "#BA0C2F",
  "Oklahoma": "#841617",
  "Oklahoma State": "#FF7300",
  "Old Dominion": "#1E3A5F",
  "Ole Miss": "#006BA6",
  "Omaha": "#000000",
  "Oral Roberts": "#002147",
  "Oregon": "#154733",
  "Oregon State": "#DC4405",
  "Pacific": "#FF6A00",
  "Penn": "#011F5B",
  "Penn State": "#002D62",
  "Pepperdine": "#00205B",
  "Pittsburgh": "#003594",
  "Portland": "#5E2A87",
  "Portland State": "#154734",
  "Prairie View A&M": "#46166B",
  "Presbyterian": "#005BAC",
  "Princeton": "#E77500",
  "Providence": "#000000",
  "Purdue": "#CFB991",
  "Purdue Fort Wayne": "#CFB991",
  "Queens": "#002147",
  "Quinnipiac": "#003366",
  "Radford": "#CE1126",
  "Rhode Island": "#6BA3DB",
  "Rice": "#00205B",
  "Richmond": "#990000",
  "Rider": "#862633",
  "Robert Morris": "#041E42",
  "Rutgers": "#CC0033",
  "SIU Edwardsville": "#E35205",
  "SMU": "#0033A0",
  "Sacramento State": "#043927",
  "Sacred Heart": "#C8102E",
  "Saint Francis (PA)": "#E35205",
  "Saint Joseph's": "#A6192E",
  "Saint Louis": "#003DA5",
  "Saint Mary's": "#C8102E",
  "Saint Peter's": "#002147",
  "Sam Houston": "#FF6A00",
  "Samford": "#0033A0",
  "San Diego": "#002147",
  "San Diego State": "#A6192E",
  "San Francisco": "#006747",
  "San Jose State": "#0055A2",
  "Santa Clara": "#A6192E",
  "Seattle U": "#C8102E",
  "Seton Hall": "#0055A2",
  "Siena": "#006747",
  "South Alabama": "#002147",
  "South Carolina": "#73000A",
  "South Carolina State": "#73000A",
  "South Dakota": "#C8102E",
  "South Dakota State": "#0033A0",
  "Southeast Missouri State": "#E32636",
  "Southeastern Louisiana": "#006747",
  "Southern": "#002147",
  "Southern California": "#990000",
  "Southern Illinois": "#660000",
  "Southern Indiana": "#002147",
  "Southern Mississippi": "#FFC72C",
  "Southern Utah": "#CE1126",
  "St. Bonaventure": "#6F4E37",
  "St. John's": "#C8102E",
  "St. Thomas": "#4E2A84",
  "Stanford": "#8C1515",
  "Stephen F. Austin": "#4E2A84",
  "Stetson": "#006747",
  "Stonehill": "#4E2A84",
  "Stony Brook": "#C8102E",
  "Syracuse": "#D44500",
  "TCU": "#4D1979",
  "Tarleton State": "#4D1979",
  "Temple": "#9D2235",
  "Tennessee": "#FF8200",
  "Tennessee State": "#0033A0",
  "Tennessee Tech": "#4F2683",
  "Texas": "#BF5700",
  "Texas A&M": "#500000",
  "Texas A&M-Commerce": "#002147",
  "Texas A&M-Corpus Christi": "#006747",
  "Texas Southern": "#500000",
  "Texas State": "#501214",
  "Texas Tech": "#CC0000",
  "The Citadel": "#002147",
  "Toledo": "#002147",
  "Towson": "#FFD700",
  "Troy": "#660000",
  "Tulane": "#006747",
  "Tulsa": "#0033A0",
  "UAB": "#006747",
  "UC Davis": "#002147",
  "UC Irvine": "#002147",
  "UC Riverside": "#002147",
  "UC San Diego": "#002147",
  "UC Santa Barbara": "#002147",
  "UCF": "#BA9B37",
  "UCLA": "#2774AE",
  "UIC": "#CE1126",
  "UL Monroe": "#660000",
  "UMBC": "#FFC72C",
  "UMass": "#881C1C",
  "UMass Lowell": "#002147",
  "UNC Asheville": "#002147",
  "UNC Greensboro": "#003366",
  "UNC Wilmington": "#006666",
  "UNLV": "#BA0C2F",
  "USC Upstate": "#1E4D2B",
  "UT Arlington": "#0064B1",
  "UT Martin": "#F77F00",
  "UT Rio Grande Valley": "#F15A22",
  "UTEP": "#041E42",
  "UTSA": "#0C2340",
  "Utah": "#CC0000",
  "Utah State": "#003366",
  "Utah Tech": "#BA1C21",
  "Utah Valley": "#275D38",
  "VCU": "#FFB300",
  "VMI": "#AE122A",
  "Valparaiso": "#381E0E",
  "Vanderbilt": "#B49248",
  "Vermont": "#154734",
  "Villanova": "#002664",
  "Virginia": "#232D4B",
  "Virginia Tech": "#861F41",
  "Wagner": "#004331",
  "Wake Forest": "#9E7E38",
  "Washington": "#4B2E83",
  "Washington State": "#A60F2D",
  "Weber State": "#492365",
  "West Georgia": "#002D62",
  "West Virginia": "#EAAA00",
  "Western Carolina": "#592A8A",
  "Western Illinois": "#660099",
  "Western Kentucky": "#D71A28",
  "Western Michigan": "#6A0032",
  "Wichita State": "#27251F",
  "William & Mary": "#115740",
  "Winthrop": "#860038",
  "Wisconsin": "#C5050C",
  "Wofford": "#987D3B",
  "Wright State": "#006747",
  "Wyoming": "#492F24",
  "Xavier": "#0C2340",
  "Yale": "#00356B",
  "Youngstown State": "#C8102E"
};


export default function App() {
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const packRip = new Audio(packRipSound);

  const [pack, setPack] = useState([]);
  const [opened, setOpened] = useState(false);
  const [team, setTeam] = useState([]);
  const [packCount, setPackCount] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [hovering, setHovering] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [revealedCards, setRevealedCards] = useState([]);
  const [shake, setShake] = useState(false);
  const flipAudio = new Audio(flipSound);
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  

  const handleAuth = async (mode) => {
    const endpoint = mode === "login" ? "/user/login" : "/user/register";
    try {
      const res = await fetch(`https://backend-sq7r.onrender.com${endpoint}`, {
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
    setWiggle(true);
    setTimeout(() => setWiggle(false), 600);

    packRip.currentTime = 0;       
    packRip.play();                

    fetch("https://backend-sq7r.onrender.com/random_players")
      .then((res) => res.json())
      .then((data) => {
        setPack(data);
        setRevealedCards(Array(data.length).fill(false));
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
              <button onClick={() => setAuthMode("login")} style={styles.button}>Login</button>
              <button onClick={() => setAuthMode("register")} style={styles.button}>Register</button>
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
  else if (showLeaderboard) {
    return (
      <div style={{ padding: "2rem", background: "#1f1f1f", color: "#fff", minHeight: "100vh" }}>
        <h1 style={{ fontSize: "2rem" }}>🏆 Leaderboard</h1>
        <h2>Top Saved Teams</h2>
        {leaderboard.length === 0 ? (
  <p>No teams saved yet.</p>
) : (
  leaderboard.map((entry, i) => (
    <div
      key={i}
      style={{
        background: "#2c2c2c",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>#{i + 1} {entry.username ?? "Unknown"}</span>
      <strong>Avg OVR: {entry.avgOVR ?? "?"}</strong>
    </div>
  ))
)}

        <button
          onClick={() => setShowLeaderboard(false)}
          style={{ marginTop: "1rem", padding: "0.75rem 1.5rem", fontSize: "1rem" }}
        >
          🎮 Start Opening Packs
        </button>
      </div>
    );
  }
  

  return (
    <div style={styles.fullPageCentered}>
      <div style={styles.stackContainer}>
        <h1 style={styles.title}>Welcome, {user}!</h1>
        <h2 style={styles.subtitle}>Pick a Player ({team.length}/12)</h2>

        {team.length < 12 ? (
          !opened ? (
            <button
            onClick={() => {
              packRip.currentTime = 0;
              packRip.play().catch((err) => console.warn("Audio play failed:", err)); // catch any issue
            openPack();              
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{ border: "none", background: "none" }}
          >
            <img
              src={packImage}
              alt="pack"
              style={{
                ...styles.packImage,
                ...(hovering ? styles.packImageHover : {}),
                ...(wiggle ? styles.packImageWiggle : {}),
              }}
            />
          </button>
          ) : (
            <div style={shake ? { ...styles.cardContainer, ...styles.shakeContainer } : styles.cardContainer}>
              {pack.map((player, i) => {
                const isRevealed = revealedCards[i];
                const teamColor = teamColors[player["Team"]] || "#1f1f1f";

                return (
                  <div
                    key={i}
                    style={{
                      ...styles.flipCardContainer,
                      ...(hoveredIndex === i ? styles.hoveredCard : {}),
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                      if (!isRevealed) {
                        const updated = [...revealedCards];
                        updated[i] = true;
                        setRevealedCards(updated);
                        flipAudio.currentTime = 0;
                        flipAudio.play();
                        setShake(true);
                        setTimeout(() => setShake(false), 500);
                      } else {
                        selectPlayer(player);
                      }
                    }}
                  >
                    <div
                      style={{
                        ...styles.flipCard,
                        transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      <div style={styles.flipCardFront}>
                        <p>?</p>
                      </div>
                      <div
                        style={{
                          ...styles.flipCardBack,
                          backgroundColor: teamColor,
                        }}
                      >
                        <h3>{player["Player Name"]}</h3>
                        <p><strong>Team:</strong> {player["Team"]}</p>
                        <p><strong>Pos:</strong> {player["Pos"]}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>Your Final Team</h2>
<div style={styles.teamGrid}>
  {team.map((player, i) => {
    const teamColor = teamColors[player["Team"]] || "#1f1f1f";
    const ovr = player["OVR_Grade"];

    const renderOVRSymbol = (ovr) => {
      if (ovr >= 78) return "⭐";
      if (ovr <= 73 && ovr >= 60) return "🗑️";
      return "";
    };

    return (
      <div
        key={i}
        style={{
          ...styles.teamCard,
          backgroundColor: teamColor,
        }}
      >
        <h3 style={styles.outlinedText}>{player["Player Name"]}</h3>
        <p style={styles.outlinedText}><strong>Team:</strong> {player["Team"]}</p>
        <p style={styles.outlinedText}><strong>Pos:</strong> {player["Pos"]}</p>
        <p style={styles.outlinedText}>PTS: {player["PTS"]}</p>
        <p style={styles.outlinedText}>FG%: {player["FG%"]} | FT%: {player["FT%"]}</p>
        <p style={styles.outlinedText}>3P%: {player["3P%"]}</p>
        <p style={styles.outlinedText}>REB: {player["REB"]} | AST: {player["AST"]}</p>
        <p style={styles.outlinedText}>STL: {player["STL"]} | BLK: {player["BLK"]}</p>
        <p style={{ 
          marginTop: "0.5rem", 
          fontWeight: "bold", 
          fontSize: "1.1rem", 
          textShadow: styles.outlinedText.textShadow 
        }}>
          {renderOVRSymbol(ovr)} OVR: {ovr}
        </p>
      </div>
    );
})}
            </div>
            <h3 style={{ marginTop: "2rem" }}>🏆 Team Average OVR: {getAverageOVR()}</h3>

            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
  <button
    style={styles.button}
    onClick={async () => {
      const avgOVR = getAverageOVR();
      try {
        const res = await fetch("https://backend-sq7r.onrender.com/user/save_team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user,
            team,
            avgOVR: parseFloat(avgOVR),
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
    }}
  >
    💾 Save Team
  </button>

  <button
    style={{ ...styles.button, backgroundColor: "#6c757d" }}
    onClick={() => {
      setTeam([]);
      setPack([]);
      setOpened(false);
      setPackCount(0);
      setRevealedCards([]);
    }}
  >
    🔄 Start New Team
  </button>
</div>
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
    maxWidth: "700px",
    right: "80%",
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
    display: "grid",
    gridTemplateColumns: "repeat(5, 220px)",
    justifyContent: "start",
    gap: "1rem",
    marginTop: "1rem",
    padding: "0 1rem",
  },
  
  flipCardContainer: {
    perspective: "1000px",
    width: "220px",
    height: "300px",
  },
  flipCard: {
    position: "relative",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s",
  },
  
  flipCardFront: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
  },
  flipCardBack: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
    color: "#ffffff",
    textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
    cursor: "pointer",
  },

  packCard: {
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "8px",
    width: "220px",
    height: "300px",
    fontSize: "1rem",
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
    cursor: "pointer",
    gap: "1rem",
  },
  teamCard: {
    width: "200px",
    height: "320px",
    border: "1px solid #ccc",
    padding: "0.5rem",
    borderRadius: "8px",
    fontSize: "0.8rem",
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    lineHeight: "0.5",
    textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
  },
  
  
  
 
  fullPageCentered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw", 
    backgroundColor: "#1f1f1f",
    color: "#fff",
    textAlign: "center",
    padding: "2rem",
    boxSizing: "border-box",
  },
  
  
  stackContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    justifyContent: "center", 
    gap: "1.5rem",
    width: "100%",
    maxWidth: "600px",
  },
  
  
  title: {
    fontSize: "3rem",        
    fontWeight: "bold",
  },
  
  subtitle: {
    fontSize: "1.6rem",      
    fontWeight: "500",
  },
  
  packImage: {
    width: "280px",          
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  
  packImageHover: {
    transform: "scale(1.05)",
  },
  
  flipCardContainer: {
    perspective: "1000px",
    width: "220px",
    height: "300px",
  },
  flipCard: {
    position: "relative",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s",
  },
  flipCardFront: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
  },
  flipCardBack: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
    transform: "rotateY(180deg)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
    cursor: "pointer",
    textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
  },
  

  packImage: {
    width: "280px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  packImageHover: {
    transform: "translateY(-10px) scale(1.05)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.6), 0 0 12px 4px rgba(255,255,255,0.3)",
  },
  packImageWiggle: {
    animation: "wiggle 0.6s ease",
  },
  '@keyframes wiggle': {
    '0%': { transform: 'rotate(0deg)' },
    '15%': { transform: 'rotate(3deg)' },
    '30%': { transform: 'rotate(-3deg)' },
    '45%': { transform: 'rotate(3deg)' },
    '60%': { transform: 'rotate(-3deg)' },
    '75%': { transform: 'rotate(2deg)' },
    '100%': { transform: 'rotate(0deg)' },
  },
  
  revealCard: {
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "8px",
    width: "220px",
    height: "300px",
    fontSize: "1rem",
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  hoveredCard: {
    transform: "scale(1.05) translateY(-5px)",
    boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.4)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  shakeContainer: {
    animation: "shake 0.4s",
  },
  "@keyframes shake": {
    "0%": { transform: "translate(0px, 0px)" },
    "25%": { transform: "translate(4px, -4px)" },
    "50%": { transform: "translate(-4px, 4px)" },
    "75%": { transform: "translate(4px, -4px)" },
    "100%": { transform: "translate(0px, 0px)" },
  },

  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)", 
    gridAutoRows: "auto",                 
    gap: "1rem",
    justifyItems: "center",
    alignItems: "start",
    padding: "1rem 2rem",
    marginTop: "1rem",
  },

  outlinedText: {
    textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
  }
  
  
  
};







