import React from "react";
import { useNavigate } from "react-router-dom";

const Popup = ({ correctAnswers, totalQuestions, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  return (
    <div className="Popup">
      <div className="PopupContent">
        <h2>Koniec quizu</h2>
        <p>
          Poprawne odpowiedzi: {correctAnswers} / {totalQuestions}
        </p>
        <button onClick={handleClose}>Powrót do menu</button>
      </div>
    </div>
  );
};

export default Popup;
