import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import mathImage from "../../imgs/math.jpeg";

import Login from "../../UI/LoginForm";

import "../Questions/questions.css";

export default function Questions() {
  const [users, setUsers] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);

  const [refresh, setRefresh] = useState(undefined);

  const history = useHistory();

  function navigateToPage(path) {
    history.push(path);
  }

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/users/list")
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setUsers(response.data);
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
          <h1>MathPrepper</h1>
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
      {!loggedIn && <Login users={users} login={() => setLoggedIn(true)} />}
      {loggedIn && (
        <div className="buttons">
          <button
            className="page-button"
            onClick={() => navigateToPage("/rooms")}
          >
            {" "}
            View All Questions{" "}
          </button>
          <button
            className="page-button"
            onClick={() => navigateToPage("/users")}
          >
            {" "}
            View All Test Questions{" "}
          </button>
        </div>
      )}
    </div>
  );
}
