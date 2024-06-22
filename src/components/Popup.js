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
        <div>Koniec quizu</div>
        <p>
          Liczba procent: {Math.round((correctAnswers / totalQuestions) * 100)}%
        </p>
        <p>
          Poprawne odpowiedzi: {correctAnswers} / {totalQuestions}
        </p>
        <button onClick={handleClose}>Powrót do menu</button>
      </div>
    </div>
  );
};

export default Popup;
