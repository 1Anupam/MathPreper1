import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import mathImage from "../../imgs/math.jpeg";

import Card from '../../UI/Card';
import TestItem from '../../UI/TestItem';

import "../Questions/questions.css";

export default function Questions() {
  const [questions, setQuestions] = useState(undefined);
  const [error, setError] = useState(undefined);

  const [refresh, setRefresh] = useState(undefined);

 

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/tests/list")
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setQuestions(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, [refresh]);

  

  

  

  return (
    <div className="content">
      <div>
        <header className="header">
          <h1>Test Questions</h1>
          <button onClick={() => history.push("/")} className="button">
            {"<--"}Go Back Home
          </button>
        </header>
        <div className="main-image">
          <img src={mathImage} alt="A table full of delicious food!" />
        </div>
        <main>
          <section className="summary">
            <h2>Ace Any Math Question</h2>
            <p>
              Add any question template to questions list. Later create specific
              test questions from those templates.
            </p>
            <p>
              MathPreper lets you create similar questions from your existing
              questions, thus allowing you to master any question.
            </p>
          </section>
        </main>
      </div>
      

      

      {error && (
        <div className="questions-error-box">
          <p>{error.toString()}</p>
        </div>
      )}
      
      <div className="questions-list">
        <Card>
        {questions ? (
          questions.map((question, index) => (
            
            <TestItem
              key={`${question.questionName}-${index}`}
              name={question.equ}
              direction={question.direction}
              rule = {question.answer}
            />
          ))
          ) : (
          <div className="questions-empty">
            <p>Sorry there are no questions right now... Come back later </p>
          </div>
        )}
        </Card>
      </div>
      <div className="buttons">
        
      </div>
      <div className="questions-list">
        
      </div>
     
    </div>
  );
}
