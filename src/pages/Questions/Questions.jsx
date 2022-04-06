import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import mathImage from "../../imgs/math.jpeg";
import QuestionItem from "../../components/Question/Question";

import "./questions.css";

export default function Questions() {
  const [questions, setQuestions] = useState(undefined);
  const [error, setError] = useState(undefined);

  const [refresh, setRefresh] = useState(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [test, setTest] = useState(false);
  const [testQuestions, setTestQuestions] = useState("");
  const [newQuestionName, setNewQuestionName] = useState({
    equ: "",
    direction: "",
    rule: "",
  });

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/problems/list")
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

  async function handleCreateQuestion() {
    console.log("printing new question", newQuestionName);
    return axios
      .post(`http://127.0.0.1:8000/problems/create/`, newQuestionName)
      .then(() => {
        setIsModalOpen(false);
        setRefresh(refresh + 1);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }

  async function postTest() {
    console.log("printing new question", test);
    test.forEach((question) =>
      axios.post(`http://127.0.0.1:8000/tests/create/`, question)
    );
    setTest(false);
    setRefresh(refresh + 1);
  }

  function handleCreateTest() {
    let tquestions = testQuestions.split(",").map((number) => {
      const question = questions[number];
      let item = question.equ;
      question.rule.split("|").forEach((str) => {
        item = item.replaceAll(
          str.split("=")[0],
          Math.floor(Math.random() * 20)
        );
      });
      return {
        equ: item,
        direction: question.direction,
      };
    });
    console.log(tquestions);
    setIsModal2Open(false);
    setTest(tquestions);
  }

  return (
    <div className="content">
      <div>
        <header className="header">
          <h1>Questions</h1>
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
      {isModalOpen && (
        <div className="create-modal">
          <input
            className="question-input"
            placeholder="Equation"
            value={newQuestionName.equ}
            onChange={(e) =>
              setNewQuestionName((state) => {
                return { ...state, equ: e.target.value };
              })
            }
          />
          <input
            className="question-input"
            placeholder="Direction"
            value={newQuestionName.direction}
            onChange={(e) =>
              setNewQuestionName((state) => {
                return { ...state, direction: e.target.value };
              })
            }
          />
          <input
            className="question-input"
            placeholder="Rule"
            value={newQuestionName.rule}
            onChange={(e) =>
              setNewQuestionName((state) => {
                return { ...state, rule: e.target.value };
              })
            }
          />

          <div className="create-actions">
            <button className="button" onClick={handleCreateQuestion}>
              Create New Question
            </button>
            <button className="button" onClick={() => setIsModalOpen(false)}>
              {" "}
              Cancel{" "}
            </button>
          </div>
        </div>
      )}

      {isModal2Open && (
        <div className="create-modal">
          <input
            className="question-input"
            placeholder="Questions"
            value={testQuestions}
            onChange={(e) => setTestQuestions(e.target.value)}
          />

          <div className="create-actions">
            <button className="button" onClick={handleCreateTest}>
              Create Test
            </button>
            <button className="button" onClick={() => setIsModal2Open(false)}>
              {" "}
              Cancel{" "}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="questions-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className="questions-list">
        {questions ? (
          questions.map((question, index) => (
            <QuestionItem
              key={`${question.questionName}-${index}`}
              name={question.equ}
              direction={question.direction}
            />
          ))
        ) : (
          <div className="questions-empty">
            <p>Sorry there are no questions right now... Come back later </p>
          </div>
        )}
      </div>
      <div>
        <button className="page-button" onClick={() => setIsModalOpen(true)}>
          {" "}
          Add New Question{" "}
        </button>
        <button className="page-button" onClick={() => setIsModal2Open(true)}>
          {" "}
          Create Test{" "}
        </button>
      </div>
      <div className="questions-list">
        {test ? (
          <div>
            {test.map((question, index) => (
              <QuestionItem
                key={`${question.questionName}-${index}`}
                name={question.equ}
                direction={question.direction}
              />
            ))}
            <button className="page-button" onClick={postTest}>
              {" "}
              Save Test{" "}
            </button>
            <button className="page-button" onClick={() => setTest(false)}>
              {" "}
              Delete Test{" "}
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
