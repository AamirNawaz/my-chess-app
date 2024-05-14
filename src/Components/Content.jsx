import React, { useState, useEffect, useRef } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";

export default function Content() {
  const [fen, setFen] = useState("start");
  const [theme, setTheme] = useState("light"); // State for theme

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // State for player color
  const [playerColor] = useState("white");

  let game = useRef(null);

  // Initialize chess game on component mount
  useEffect(() => {
    game.current = new Chess();
  }, []);

  // Function to handle piece drop on the board
  const onDropMove = ({ sourceSquare, targetSquare }) => {
    try {
      let move = game.current.move({
        from: sourceSquare,
        to: targetSquare,
      });

      // If move is null, it's an illegal move
      if (move === null) {
        throw new Error("Illegal move");
      }

      setFen(game.current.fen());

      // Check player color to move accordingly
      if (playerColor === "white" && !game.current.game_over()) {
        setTimeout(() => {
          const computerTurn = game.current.moveBest();
          if (computerTurn) {
            setFen(game.current.fen());
          }
        }, 400);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    game.current.clear();
    game.current.reset();
    setFen("start");
  };

  // Container styles for the board and buttons
  const containerStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: theme === "light" ? "#f8f9fa" : "#343a40", // Apply light or dark background color
    color: theme === "light" ? "#000000" : "#ffffff", // Apply light or dark text color
  };

  return (
    <>
      {/* Theme toggle button */}
      <div style={containerStyle}>
        <button
          onClick={toggleTheme}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {/* Toggle icon */}
          <div className="flex flex-col justify-center ml-3">
            <input
              type="checkbox"
              name="light-switch"
              className="light-switch sr-only"
            />
            <label
              className="relative cursor-pointer p-2"
              htmlFor="light-switch"
            >
              <svg
                class="dark:hidden"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-slate-300"
                  d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
                />
                <path
                  class="fill-slate-400"
                  d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
                />
              </svg>
              <svg
                class="hidden dark:block"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-slate-400"
                  d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
                />
                <path
                  class="fill-slate-500"
                  d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
                />
              </svg>
              <span className="sr-only">Switch to light / dark version</span>
            </label>
          </div>
        </button>
      </div>

      {/* Chessboard */}
      <div style={{ ...containerStyle, height: "100vh" }}>
        {game.current && game.current.game_over ? "Game over" : ""}
        <Chessboard position={fen} onDrop={onDropMove} />
      </div>

      {/* Reset game button */}
      <div style={{ marginTop: "-6rem", ...containerStyle }}>
        <button
          type="button"
          onClick={resetGame}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Reset Game
        </button>
      </div>
    </>
  );
}
