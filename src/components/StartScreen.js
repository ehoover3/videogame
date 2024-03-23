import React, { useState } from "react";

const StartScreen = ({ onStart }) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const dialogues = ["Whoa... what just happened? Where am I?", "Welcome to existence, my bony friend."];

  const handleClick = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      onStart();
    }
  };

  return (
    <div>
      <div style={{ height: "630px", backgroundColor: "black" }}></div>
      <div className='dialogue-box'>
        <p>{dialogues[dialogueIndex]}</p>
        <button onClick={handleClick}>{dialogueIndex < dialogues.length - 1 ? "Next" : "Start"}</button>
      </div>
    </div>
  );
};

export default StartScreen;
