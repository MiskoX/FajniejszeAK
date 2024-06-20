import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"

function Menu() {
  return (
    <div className="Menu">
      <div className="Logo"><img src={Logo}></img></div>
      <Link to="/quiz">Start</Link>
    </div>
  );
}

export default Menu;
