import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MenuCategory({ questionsOriginal, setFilteredQuestions }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isRandomChecked, setIsRandomChecked] = useState(false);
  const [isRandomCategoriesChecked, setIsRandomCategoriesChecked] = useState(false);

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
  };

  const handleRandomCheckboxChange = (event) => {
    setIsRandomChecked(event.target.checked);
  };

  const handleRandomCategoriesCheckboxChange = (event) => {
    setIsRandomCategoriesChecked(event.target.checked);
    if (event.target.checked) {
      const numCategories = Math.floor(Math.random() * (categories.length / 2)) + 1;
      const shuffledCategories = [...categories].sort(() => Math.random() - 0.5);
      const randomlySelected = shuffledCategories.slice(0, numCategories);
      setSelectedCategories(randomlySelected);
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSubmit = () => {
    let filterQuestions = [...questionsOriginal].filter((q) =>
      selectedCategories.includes(q.Category)
    );
    filterQuestions = isRandomChecked
      ? shuffleQuestions(filterQuestions)
      : filterQuestions;
    setFilteredQuestions(filterQuestions);
    navigate("/category_quiz");
  };

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
        <div className="Button Responsive-btn">
          <div className="Checkbox">
            <p>Losowo</p>
            <input
              type="checkbox"
              checked={isRandomChecked}
              onChange={handleRandomCheckboxChange}
            ></input>
          </div>
          <div className="Checkbox">
            <p>Wybierz losowo kategorie</p>
            <input
              type="checkbox"
              checked={isRandomCategoriesChecked}
              onChange={handleRandomCategoriesCheckboxChange}
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
