import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import mathImage from "../../imgs/math.jpeg";
import Info from '../../UI/Info';

import Login from "../../UI/LoginForm";


export default function Home({login, loggedIn}) {

  const [error, setError] = useState(undefined);
  

  const refresh = useState(undefined)[0];

  const history = useHistory();

  function navigateToPage(path) {
    history.push(path);
  }

  

  return (
    <Fragment>

    <div className="content">
      <div>
        <header className="header">
          <h1>MathPrepper</h1>
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
      {!loggedIn && <Login login={login} />}
      {loggedIn && (
        <div className="buttons">
          <button
            className="page-button"
            onClick={() => navigateToPage("/questions")}
          >
            {" "}
            View All Questions{" "}
          </button>
          <button
            className="page-button"
            onClick={() => navigateToPage("/test-questions")}
          >
            {" "}
            View All Test Questions{" "}
          </button>
        </div>
      )}

      
    
    </div>
    {!loggedIn && <Info />}
    
    </Fragment>
  );
}
