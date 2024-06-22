import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MenuCategory({ questionsOriginal, setFilteredQuestions }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
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

  const handleSubmit = () => {
    const filterQuestions = [...questionsOriginal].filter((q) =>
      selectedCategories.includes(q.Category)
    );
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
