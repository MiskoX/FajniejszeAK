import React, { useState, useEffect } from "react";
import questionsData from "../data/questions.json";
import DoubleButton from "../components/DoubleButton";
import SingleButton from "../components/SingleButton";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [procent, setProcent] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [allOfQuestion, setAllOfQuestion] = useState(0);
  const [questionBoxClass, setQuestionBoxClass] = useState(null);
  const [stateOfQuestion, setStateOfQuestion] = useState(null);

  useEffect(() => {
    setQuestions(questionsData);
    setAllOfQuestion(questionsData.length);
    setProcent(0);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (stateOfQuestion === null) {
        if (event.key === "P" || event.key === "p") {
          handleAnswer(true);
        } else if (event.key === "F" || event.key === "f") {
          handleAnswer(false);
        }
      } else {
        nextQuestion();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [stateOfQuestion]);

  const handleAnswer = (answer) => {
    const answerQue = answeredQuestions + 1;
    var correctAns = correctAnswers;

    if (answer === questions[currentQuestionIndex].Answer) {
      correctAns = correctAns + 1;
      setQuestionBoxClass("correct");
      setCorrectAnswers(correctAns);
    } else {
      setQuestionBoxClass("incorrect");
    }

    const percentage = Math.round((correctAns / answerQue) * 100);
    setProcent(percentage);
    setAnsweredQuestions(answerQue);
    setStateOfQuestion("1");
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < allOfQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Koniec quizu");
    }
    setQuestionBoxClass(null);
    setStateOfQuestion(null);
  };

  return (
    <div className="Quiz">
      <div className="Navbar">
        <p>
          Liczba pytań: {currentQuestionIndex + 1}/{allOfQuestion}
        </p>
        <p>Liczba Procent: {procent}%</p>
      </div>
      <div className={`QuestionBox ${questionBoxClass}`}>
        {questions.length > 0 && (
          <div className="Question">
            <div>Pytanie:</div>
            <p>{questions[currentQuestionIndex].Question}</p>
          </div>
        )}
        {stateOfQuestion ? (
          <>
            <div className="Description">
              Opis:
              <p> {questions[currentQuestionIndex].Description}</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {stateOfQuestion ? (
        <SingleButton nextQuestion={nextQuestion} />
      ) : (
        <DoubleButton handleAnswer={handleAnswer} />
      )}
    </div>
  );
}

export default Quiz;
