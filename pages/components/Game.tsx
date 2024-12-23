"use client";

import { useState, useEffect } from "react";

export default function Game() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: "50%", left: "50%" });

  useEffect(() => {
    if (isGameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [isGameStarted, timeLeft]);

  const startGame = () => {
    setIsGameStarted(true);
    setGameOver(false);
    setTimeLeft(15);
    setScore(0);
    setButtonPosition({ top: "50%", left: "50%" }); // Reset pos
  };

  const handleClick = () => {
    if (!gameOver) {
      setScore(score + 1);
      setButtonPosition({
        top: `${Math.floor(Math.random() * 80) + 10}%`,
        left: `${Math.floor(Math.random() * 80) + 10}%`,
      });
    }
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Hack the Button!</h1>
      {!isGameStarted ? (
        <button className="hacker-start-button" onClick={startGame}>
          Start Game
        </button>
      ) : (
        <>
          {gameOver ? (
            <div className="end-screen">
              <p>Game Over!</p>
              <p>Your Score: {score}</p>
              <button className="hacker-restart-button" onClick={startGame}>
                Restart
              </button>
            </div>
          ) : (
            <div>
              <p>Time Left: {timeLeft}s</p>
              <p>Score: {score}</p>
              <button
                className="hacker-button"
                onClick={handleClick}
                style={{
                  position: "absolute",
                  ...buttonPosition,
                  transform: "translate(-50%, -50%)",
                }}
              >
                Click Me!
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
