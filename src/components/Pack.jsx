import React, { useState } from 'react';
import { styles } from '../styles/styles';
import { teamColors } from '../styles/theme';
import packImage from '../assets/pack.png';
import flipSound from '../assets/flip.mp3';
import packRipSound from '../assets/packRip.mp3';

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

  return (
    <div style={styles.stackContainer}>
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