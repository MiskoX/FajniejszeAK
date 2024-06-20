import React, { useState, useEffect } from "react";
import DoubleButton from "../components/DoubleButton";
import SingleButton from "../components/SingleButton";
import { useNavigate, useParams } from "react-router-dom";

function Quiz({ quizType, questions, setQuestions, questionsOriginal }) {
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [procent, setProcent] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [allOfQuestion, setAllOfQuestion] = useState(0);
  const [questionBoxClass, setQuestionBoxClass] = useState("");
  const [stateOfQuestion, setStateOfQuestion] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let questionsArray = [...questionsOriginal]; // kopia tablicy questionsOriginal

    switch (quizType) {
      case "random":
        questionsArray = questionsArray.sort(() => Math.random() - 0.5);
        setQuestions(questionsArray);
        break;
      case "classic":
        setQuestions(questionsArray);
        break;
      default:
        break;
    }

    setAllOfQuestion(questionsArray.length);
    setProcent(0);

    const uniqueCategories = [
      ...new Set(questionsArray.map((q) => q.Category)),
    ];
    setCategories(uniqueCategories);
  }, [quizType]);

  useEffect(() => {
    if (questions.length > 0) {
      const handleKeyPress = (event) => {
        if (event.repeat) return;
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
    }
  }, [stateOfQuestion, currentQuestionIndex, questions]);

  const handleAnswer = (answer) => {
    if (questions.length === 0) return;

    const answerQue = answeredQuestions + 1;
    let correctAns = correctAnswers;

    if (answer === questions[currentQuestionIndex].Answer) {
      correctAns += 1;
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
      navigate("/");
    }
    setQuestionBoxClass("");
    setStateOfQuestion(null);
  };

  // console.log("All categories:", categories);

  return (
    <div className="Quiz">
      <div className="Navbar">
        <p>
          Pytania: {currentQuestionIndex + 1}/{allOfQuestion}
        </p>
        <p>Procenty: {procent}%</p>
      </div>
      <div className="Box">
        <div className={`QuestionBox ${questionBoxClass}`}>
          {questions.length > 0 && (
            <div className="Question">
              <div>Pytanie:</div>
              <p>{questions[currentQuestionIndex].Question}</p>
            </div>
          )}
          <div className={`Description ${stateOfQuestion ? "show" : ""}`}>
            {stateOfQuestion ? (
              <>
                Opis:
                <p>{questions[currentQuestionIndex].Description}</p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
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
