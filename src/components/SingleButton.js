import React, { useState, useEffect } from "react";

function SingleButton({nextQuestion}) {
  return (
    <div className="SingleButton">
      <div className="Button">
        <button onClick={nextQuestion}>Następne pytanie</button>
      </div>
    </div>
  );
}

export default SingleButton;
