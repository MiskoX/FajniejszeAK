import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import questionsData from "./data/questions.json";

import Quiz from "./pages/Quiz";
import Menu from "./pages/Menu";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  return (
    <Router basename="/FajniejszeAK">
      <div className="App">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route
            path="/quiz"
            element={
              <Quiz questions={questions} setQuestions={setQuestions} questionsData={questionsData} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
