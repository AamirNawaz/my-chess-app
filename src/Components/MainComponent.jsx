import React, { useState, useEffect, useRef } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";

export default function MainComponent() {
  const [fen, setFen] = useState("start");
  const [theme, setTheme] = useState("light"); // Add state for theme
  let game = useRef(null);

  useEffect(() => {
    game.current = new Chess();
  }, []);

  const containerStyle = {
    marginTop: "4rem",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    
    backgroundColor: theme === "light" ? "#ffffff" : "#222222", // Apply theme background color
    color: theme === "light" ? "#000000" : "#ffffff", // Apply theme text color
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light"); // Toggle theme
  };

  const onDropMove = ({ sourceSquare, targetSquare }) => {
    try {
      let move = game.current.move({
        from: sourceSquare,
        to: targetSquare
      });

      // If move is null, it's an illegal move
      if (move === null) {
        throw new Error("Illegal move");
      }

      setFen(game.current.fen());
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const resetGame = () => {
    game.current.clear();
    game.current.load("start");
    setFen("start");
  };

  return (
    <>
      <button onClick={resetGame}>Restart</button>
      <button onClick={toggleTheme}>Toggle Theme</button> {/* Add button to toggle theme */}
      <div style={containerStyle}>
        {game.current && game.current.game_over ? "Game over" : ""}
        <Chessboard position={fen} onDrop={onDropMove} />
      </div>
    </>
  );
}