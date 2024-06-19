import React, { useState, useEffect } from "react";

function DoubleButton({ handleAnswer }) {
  return (
    <div className="Buttons">
      <div className="Button">
        <button onClick={() => handleAnswer(true)}>Prawda</button>
      </div>
      <div className="Button">
        <button onClick={() => handleAnswer(false)}>Fałsz</button>
      </div>
    </div>
  );
}

export default DoubleButton;
