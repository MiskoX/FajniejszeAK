import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MenuCategory({ questionsOriginal, setFilteredQuestions }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isRandomChecked, setIsRandomChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let questionsArray = [...questionsOriginal];

    const uniqueCategories = [
      ...new Set(questionsArray.map((q) => q.Category)),
    ];
    setCategories(uniqueCategories);
  }, [questionsOriginal]);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((cat) => cat !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const shuffleQuestions = (questions) => {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  }

  const handleRandomCheckboxChange = (event) => {
    setIsRandomChecked(event.target.checked);
  };

  const handleSubmit = () => {
    let filterQuestions = [...questionsOriginal].filter((q) =>
      selectedCategories.includes(q.Category)
    );
    filterQuestions = isRandomChecked ? shuffleQuestions(filterQuestions) : filterQuestions;
    setFilteredQuestions(filterQuestions);
    navigate("/category_quiz");
  };
  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);

  return (
    <div className="Quiz">
    
      <div className="Box">
        <div className="Categories">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`Category ${
                selectedCategories.includes(category) ? "selected" : ""
              }`}
            >
              <input
                type="checkbox"
                id={`category-${index}`}
                onChange={() => handleCheckboxChange(category)}
              />
              <label htmlFor={`category-${index}`}>{category}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="SingleButton">
        <div className="Button">
          <div className="Checkbox">
        <p>Losowo</p>
        <input
         type="checkbox"
         checked={isRandomChecked}
         onChange={handleRandomCheckboxChange}
         ></input>
        </div>
          <button
            onClick={handleSubmit}
            disabled={selectedCategories.length === 0}
          >
            Zatwierdź
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuCategory;
