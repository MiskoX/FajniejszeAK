import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="Menu">
      <div className="Title">Fajniejsze AK</div>
      <Link to="/quiz">Start Quiz</Link>
    </div>
  );
}

export default Menu;
