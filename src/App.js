import React, { useState, useEffect, useCallback } from "react";
import "./Maze.css";

const MAZE_WIDTH = 30;
const MAZE_HEIGHT = 20;

const Maze = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const npcPosition = { x: 5, y: 5 };

  const movePlayer = useCallback(
    (dx, dy) => {
      const newX = playerPosition.x + dx;
      const newY = playerPosition.y + dy;

      if (newX >= 0 && newX < MAZE_WIDTH && newY >= 0 && newY < MAZE_HEIGHT) {
        setPlayerPosition({ x: newX, y: newY });
      }
    },
    [playerPosition]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          movePlayer(0, -1);
          break;
        case "ArrowDown":
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
          movePlayer(-1, 0);
          break;
        case "ArrowRight":
          movePlayer(1, 0);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [movePlayer]);

  const renderCell = (x, y, playerPosition, npcPosition) => {
    const isPlayerCell = x === playerPosition.x && y === playerPosition.y;
    const isNpcCell = x === npcPosition.x && y === npcPosition.y;

    let cellClass = "cell";
    if (isPlayerCell) {
      cellClass = "player";
    } else if (isNpcCell) {
      cellClass = "npc";
    }

    return <div key={`${x}-${y}`} className={cellClass} />;
  };

  const renderRow = (y, playerPosition, npcPosition) => {
    const cells = [];
    for (let x = 0; x < MAZE_WIDTH; x++) {
      cells.push(renderCell(x, y, playerPosition, npcPosition));
    }
    return (
      <div key={y} className='row'>
        {cells}
      </div>
    );
  };

  const renderMaze = () => {
    const rows = [];
    for (let y = 0; y < MAZE_HEIGHT; y++) {
      rows.push(renderRow(y, playerPosition, npcPosition));
    }
    return rows;
  };

  return <div className='maze'>{renderMaze()}</div>;
};

export default Maze;
