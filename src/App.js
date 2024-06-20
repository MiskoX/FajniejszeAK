import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Quiz from "./pages/Quiz";
import Menu from "./pages/Menu";

function App() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if(questions){
      setQuestions([]);
    }
  }, []);

  return (
    <Router basename="/FajniejszeAK">
      <div className="App">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/quiz/classic" element={<Quiz quizType="classic" questions={questions} setQuestions={setQuestions}/>} />
          <Route path="/quiz/random" element={<Quiz quizType="random" questions={questions} setQuestions={setQuestions}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
