import React, { useState, useEffect, useRef } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";

export default function Content() {
  const [fen, setFen] = useState("start");

  const [playerColor] = useState("white");

  let game = useRef(null);

  useEffect(() => {
    game.current = new Chess();
  }, []);

  const containerStyle = {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

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

      //Check player color to move accordingly
      if (playerColor === "whtie" && !game.current.game_over()) {
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

  const resetGame = () => {
    game.current.clear();
    game.current.reset();
    setFen("start");
  };

  return (
    <>
      <div style={containerStyle}>
        <button
          onClick={resetGame}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Restart Game
        </button>
      </div>
      <div style={containerStyle}>
        {game.current && game.current.game_over ? "Game over" : ""}
        <Chessboard position={fen} onDrop={onDropMove} />
      </div>
    </>
  );
}
