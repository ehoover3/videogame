import React, { useState, useEffect, useCallback, useMemo } from "react";
import StartScreen from "./components/StartScreen";
import "./Maze.css";

const MAZE_WIDTH = 30;
const MAZE_HEIGHT = 20;

const Maze = () => {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0, direction: "down" });
  const npcPosition = useMemo(() => ({ x: 5, y: 5 }), []);
  const [showDialogue, setShowDialogue] = useState(false);

  const handleStart = () => {
    setShowStartScreen(false);
  };

  const movePlayer = useCallback(
    (dx, dy, newDirection) => {
      const newX = playerPosition.x + dx;
      const newY = playerPosition.y + dy;

      if (newX >= 0 && newX < MAZE_WIDTH && newY >= 0 && newY < MAZE_HEIGHT) {
        setPlayerPosition({ x: newX, y: newY, direction: newDirection });
      }
    },
    [playerPosition]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          movePlayer(0, -1, "up");
          break;
        case "ArrowDown":
          movePlayer(0, 1, "down");
          break;
        case "ArrowLeft":
          movePlayer(-1, 0, "left");
          break;
        case "ArrowRight":
          movePlayer(1, 0, "right");
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [movePlayer]);

  useEffect(() => {
    const isNextToNPC = (playerPosition.x === npcPosition.x && Math.abs(playerPosition.y - npcPosition.y) === 1) || (playerPosition.y === npcPosition.y && Math.abs(playerPosition.x - npcPosition.x) === 1);
    setShowDialogue(isNextToNPC);
  }, [playerPosition, npcPosition]);

  const renderCell = (x, y, playerPosition, npcPosition) => {
    const isPlayerCell = x === playerPosition.x && y === playerPosition.y;
    const isNpcCell = x === npcPosition.x && y === npcPosition.y;
    let cellClass = "cell";
    if (isPlayerCell) {
      cellClass = "player";
      switch (playerPosition.direction) {
        case "up":
          cellClass += " up";
          break;
        case "down":
          cellClass += " down";
          break;
        case "left":
          cellClass += " left";
          break;
        case "right":
          cellClass += " right";
          break;
        default:
          break;
      }
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

  return (
    <div>
      {showStartScreen ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <>
          <div>
            <div className='maze'>{renderMaze()}</div>
            {showDialogue && (
              <div className='dialogue-box'>
                <p>Hello there!</p>
                <button onClick={() => setShowDialogue(false)}>Close</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Maze;
