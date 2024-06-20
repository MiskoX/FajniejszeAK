import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"

function Menu() {
  return (
    <div className="Menu">
      <div className="Logo"><img src={Logo}></img></div>
      <Link to="/quiz/classic">Pytania po kolei</Link>
      <Link to="/quiz/random">Pytania losowe</Link>
      {/* <Link to="/quiz/category">Pytania z kategorii</Link> */}
    </div>
  );
}

export default Menu;
