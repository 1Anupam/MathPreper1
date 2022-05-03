import React, { useEffect, useState } from "react";
import { evaluate } from "mathjs";
import axios from "axios";
import { useHistory } from "react-router-dom";
import mathImage from "../../imgs/math.jpeg";
import QuestionItem from "../../components/Question/Question";
import Card from "../../UI/Card";
import TestItem from "../../UI/TestItem";
import Modal from "../../UI/Modal";

import "./questions.css";

const initialState = {
  equ: "",
  direction: "",
  rule: "",
  answer: "",
};

export default function Questions() {
  const [questions, setQuestions] = useState(undefined);
  const [error, setError] = useState(undefined);

  const [refresh, setRefresh] = useState(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [test, setTest] = useState(false);
  const [testQuestions, setTestQuestions] = useState("");
  const [newQuestionName, setNewQuestionName] = useState(initialState);

  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://mathpreper.herokuapp.com/problems/list")
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
      .post(
        `https://mathpreper.herokuapp.com/problems/create/`,
        newQuestionName
      )
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
    console.log(test);
    test.forEach((question) =>
      axios.post(`https://mathpreper.herokuapp.com/tests/create/`, question)
    );
    setTest(false);
    setRefresh(refresh + 1);
  }

  function parseQuestion(number) {
    let problem = questions[number];

    let equation = problem.equ;

    let ans = problem.answer;
    let variables = {};

    problem.rule.split("|").forEach((str) => {
      let [variable, value] = str.split("=");
      variables[variable] = value;
    });

    for (const property in variables) {
      let integer = Math.floor(Math.random() * 100);
      equation = equation.replaceAll(property, integer);
      ans = ans.replaceAll(property, integer);
    }
    console.log("hello darkness 1", equation, evaluate(ans));
    return {
      equ: equation,
      direction: problem.direction,
      answer: evaluate(ans),
    };
  }

  function handleCreateTest() {
    console.log("hello darkness", testQuestions);
    let tquestions = testQuestions
      .split(",")
      .map((number) => parseQuestion(number.trim()));
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
        <Modal
          title="Create new question template"
          Cancel={() => setIsModalOpen(false)}
        >
          <label for="equ">
            The equation has the main problem. It also includes the the
            variables that will take on different values for each generated
            question:{" "}
          </label>
          <input
            id="equ"
            className="question-input"
            placeholder="Equation"
            value={newQuestionName.equ}
            onChange={(e) =>
              setNewQuestionName((state) => {
                return { ...state, equ: e.target.value };
              })
            }
          />

          <label for="direction">
            The direction tells us what the question is asking. This part of the
            question won't change for every generated question:{" "}
          </label>
          <input
            id="direction"
            className="question-input"
            placeholder="Direction"
            value={newQuestionName.direction}
            onChange={(e) =>
              setNewQuestionName((state) => {
                return { ...state, direction: e.target.value };
              })
            }
          />

          <label for="Rule">
            The rule tells us what is changing in each generated question. Pick
            any variable from the equation and match it to what type it should
            be{" "}
          </label>
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

          <label for="Answer">
            The answer tells us how to solve the equation. Write out the
            expression(can include variables, numbers, mathmatical operators)
            that gives us the solution to any generated question:{" "}
          </label>
          <input
            id="Answer"
            className="question-input"
            placeholder="Answer"
            value={newQuestionName.answer}
            onChange={(e) =>
              setNewQuestionName((state) => {
                return { ...state, answer: e.target.value };
              })
            }
          />

          <div className="create-actions">
            <button
              className="button"
              onClick={() => {
                handleCreateQuestion();
                setNewQuestionName(initialState);
              }}
            >
              Create New Question
            </button>
            <button
              className="button"
              onClick={() => {
                setIsModalOpen(false);
                setNewQuestionName(initialState);
              }}
            >
              {" "}
              Cancel{" "}
            </button>
          </div>
        </Modal>
      )}

      {isModal2Open && (
        <Modal title="Enter the question numbers the generated test should have as comma separated values">
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
        </Modal>
      )}

      {error && (
        <div className="questions-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className="questions-list">
        {test ? (
          <div>
            <h3 className="test-header">Test</h3>
            <Card>
              {test.map((question, index) => (
                <TestItem
                  key={`${question.questionName}-${index}`}
                  name={question.equ}
                  direction={question.direction}
                  rule={question.answer}
                />
              ))}
            </Card>
            <div className="buttonstest">
              <button className="page-button" onClick={postTest}>
                {" "}
                Save Test{" "}
              </button>
              <button className="page-button" onClick={() => setTest(false)}>
                {" "}
                Delete Test{" "}
              </button>
              <button
                className="page-button"
                onClick={() => handleCreateTest(testQuestions)}
              >
                {" "}
                ReMake Test{" "}
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="questions-list">
        <Card>
          {questions ? (
            questions.map((question, index) => (
              <QuestionItem
                key={`${question.questionName}-${index}`}
                name={question.equ}
                direction={question.direction}
                rule={question.rule}
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
        <button className="page-button" onClick={() => setIsModalOpen(true)}>
          {" "}
          Add New Question{" "}
        </button>
        <button className="page-button" onClick={() => setIsModal2Open(true)}>
          {" "}
          Create Test{" "}
        </button>
      </div>
    </div>
  );
}
