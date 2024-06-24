import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

function Menu() {
  return (
    <div className="Menu">
      <Link
        to="/posters"
        style={{
          padding: 0,
          backgroundColor: "transparent",
          boxShadow: "none",
          width: "100%",
          cursor: "default",
        }}
      >
        <div className="Logo">
          <img src={Logo}></img>
        </div>
      </Link>
      <Link to="/classic">Pytania po kolei</Link>
      <Link to="/random">Pytania losowe</Link>
      <Link to="/category">Pytania z kategorii</Link>
    </div>
  );
}

export default Menu;
