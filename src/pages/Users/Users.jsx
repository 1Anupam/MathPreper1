import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import QuestionItem from "../../components/Question/Question";
import mathImage from "../../imgs/math.jpeg";


import "./users.css";

export default function Users() {
  const [users, setUsers] = useState(undefined);
  const [error, setError] = useState(undefined);

  const [refresh, setRefresh] = useState(0);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [newUserName, setNewUserName] = useState('');

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/tests/list")
      .then((response) => {
        if (response.data) {
          setUsers(response.data);
        }
      })
      .catch((error) => {
        setError(error);
        console.log(error);
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
        <div className="rooms-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className="test-list">
        {users ? (
          users.map((question, index) => (
            <QuestionItem
              key={`${question.questionName}-${index}`}
              name={question.equ}
              direction={question.direction}
            />
          ))
        ) : (
          <div className="rooms-empty">
            <p>Sorry there are no rooms right now... Come back later </p>
          </div>
        )}
      </div>

      
    </div>
  );
}
