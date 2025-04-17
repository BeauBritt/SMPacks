import React, { useState } from 'react';
import { styles } from '../styles/styles';
import { teamColors } from '../styles/theme';
import packImage from '../assets/pack.png';
import flipSound from '../assets/flip.mp3';
import packRipSound from '../assets/packRip.mp3';
import { marchMadnessTeams } from '../data/marchMadnessTeams';

export const Pack = ({ pack, onSelectPlayer, onOpenPack, currentPlayers, maxPlayers }) => {
  const [hovering, setHovering] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [revealedCards, setRevealedCards] = useState([]);
  const [shake, setShake] = useState(false);

  const handleOpenPack = () => {
    setWiggle(true);
    setTimeout(() => setWiggle(false), 600);
    new Audio(packRipSound).play();
    setRevealedCards([]);
    onOpenPack();
  };

  const handleCardClick = (index) => {
    if (!revealedCards[index]) {
      const updated = [...revealedCards];
      updated[index] = true;
      setRevealedCards(updated);
      new Audio(flipSound).play();
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      onSelectPlayer(pack[index]);
    }
  };

  const isMarchMadnessPlayer = (team) => {
    return marchMadnessTeams.includes(team);
  };

  const styles = {
    stackContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: '#1f1f1f',
      color: '#fff',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      color: '#fff',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '1.5rem',
      marginBottom: '2rem',
      color: '#fff',
      textAlign: 'center',
    },
    packImage: {
      width: '300px',
      height: 'auto',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    },
    packImageHover: {
      transform: 'scale(1.1)',
    },
    packImageWiggle: {
      animation: 'wiggle 0.5s ease-in-out',
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
    hoveredCard: {
      transform: 'translateY(-10px)',
      transition: 'transform 0.3s ease',
    },
    shakeContainer: {
      animation: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
    },
  };

  return (
    <div style={{
      ...styles.stackContainer,
      backgroundColor: '#1f1f1f'
    }}>
      <h1 style={styles.title}>Welcome!</h1>
      <h2 style={styles.subtitle}>Pick a Player</h2>
      
      <div style={{
        marginBottom: '1rem',
        fontSize: '1.2rem',
        color: '#fff',
        textAlign: 'center'
      }}>
        Players: {currentPlayers}/{maxPlayers}
      </div>

      {!pack.length ? (
        <button
          onClick={handleOpenPack}
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
                onClick={() => handleCardClick(i)}
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
                    {isRevealed && isMarchMadnessPlayer(player.Team) && (
                      <div style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        backgroundColor: '#FFD700',
                        color: '#000',
                        padding: '0.35rem 0.7rem',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        zIndex: 1,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}>
                        MM
                      </div>
                    )}
                    <h3>{player["Player Name"]}</h3>
                    <p><strong>Team:</strong> {player["Team"]}</p>
                    <p><strong>Pos:</strong> {player["Pos"]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}; 