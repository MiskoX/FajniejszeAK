import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import questionsJSON from "./data/questions.json";

import Quiz from "./pages/Quiz";
import Menu from "./pages/Menu";
import MenuCategory from "./pages/MenuCategory";
import Posters from "./components/Posters";

function App() {
  const [questionsOriginal, setQuestionsOriginal] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    if (questionsJSON) {
      setQuestionsOriginal(questionsJSON);
    }
  }, []);

  return (
    <Router basename="/FajniejszeAK">
      <div className="App">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route
            path="/classic"
            element={
              <Quiz
                quizType="classic"
                questions={[...questions]}
                setQuestions={setQuestions}
                questionsOriginal={[...questionsOriginal]}
              />
            }
          />
          <Route
            path="/random"
            element={
              <Quiz
                quizType="random"
                questions={[...questions]}
                setQuestions={setQuestions}
                questionsOriginal={[...questionsOriginal]}
              />
            }
          />
          <Route
            path="/category"
            element={
              <MenuCategory
                questionsOriginal={[...questionsOriginal]}
                setFilteredQuestions={setFilteredQuestions}
              />
            }
          />
          <Route
            path="/category_quiz"
            element={
              <Quiz
                quizType="category"
                questions={[...filteredQuestions]}
                setQuestions={setQuestions}
                questionsOriginal={[...questionsOriginal]}
              />
            }
          />
          <Route path="/posters" element={<Posters />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
