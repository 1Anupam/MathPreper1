import React, { useEffect, useState } from "react";
import { evaluate, parse } from "mathjs";
import axios from "axios";
import { useHistory } from "react-router-dom";
import mathImage from "../../imgs/math.jpeg";
import QuestionItem from "../../components/Question/Question";
import Card from "../../UI/Card";
import TestItem from "../../UI/TestItem";
import Modal from "../../UI/Modal";

import "./questions.css";

export default function Questions({ user }) {
  
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
    rule: [""],
    answer: "",
    user,
  });
  const [errors, setErrors] = useState({
    equ: false,
    direction: false,
    rule: false,
    answer: false,
  });
  const [touched, setTouched] = useState({
    equ: false,
    direction: false,
    rule: false,
    answer: false,
  });

  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://mathpreper.onrender.com/api/problems")
      .then((response) => {
        if (response.data) {
          let data = response.data.filter((elem) => elem.user === user);
          
          setQuestions(data);
        }
      })
      .catch((error) => {
        
        setError(error);
      });
  }, [refresh, user]);

  async function handleCreateQuestion(data) {
    
    console.log(data)
    axios
      .post(`https://mathpreper.onrender.com/problems`, data)
      .then(() => {
        setIsModalOpen(false);
        setRefresh(state => !state);
      })
      .catch((error) => {
        setError(error);
        
      });
    setTestQuestions("");
  }

  async function postTest() {
    
    test.forEach((question) =>
      axios.post(`https://mathpreper.onrender.com/tests`, question)
    );
    setTest(false);
    setRefresh(state => !state);
  }

  function refreshInputs() {
    setErrors({
      equ: false,
      direction: false,
      rule: false,
      answer: false,
    });

    setTouched({
      equ: false,
      direction: false,
      rule: false,
      answer: false,
    });

    setNewQuestionName({
      equ: "",
      direction: "",
      rule: [""],
      answer: "",
      user,
    });

    setTestQuestions("");
    setIsModalOpen(false);
    setIsModal2Open(false);
  }

  function showErrors() {
    let obj = {}
    for (const elem in touched) {
      if (!touched[elem]) obj[elem] = true;
    }
    setErrors(obj);
  }

  function DeleteQuestion(id) {
    
    

    return axios
      .delete(`https://mathpreper.onrender.com/api/delete/${id}`)
      .then(() => {
        
        setRefresh(state => !state);
      })
      .catch((error) => {
        
        setError(error);
        
      });
    


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
      let num = Math.random() * 10000;
      if (variables[property] === "ints") {
        
        num = Math.floor(num);
      }

      equation = equation.replaceAll(property, num);
      ans = ans.replaceAll(property, num);
    }
    let finalAnswer = undefined;
    try {
      finalAnswer = evaluate(ans);
    } catch (ex) {
      finalAnswer = ans;
    }

    return {
      equ: equation,
      direction: problem.direction,
      answer: finalAnswer,
      user: problem.user,
    };
  }

  function handleCreateTest() {
    let tquestions = testQuestions
      .split(",")
      .map((number) => parseQuestion(Number(number.trim()) - 1));
    
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
        <Modal title="Create new question template" Cancel={refreshInputs}>
          <label for="equ">
            Contains the variables for this question template. Each question generated from this template will each varible replace by a specific data type
          </label>
          <div>
            <input
              id="equ"
              placeholder="Equation"
              value={newQuestionName.equ}
              onChange={(e) => {
                setTouched((state) => {
                  return { ...state, equ: true };
                });
                if (e.target.value.length < 1) {
                  setErrors((state) => {
                    return { ...state, equ: true };
                  });
                }
                if (e.target.value.length === 1) {
                  setErrors((state) => {
                    return { ...state, equ: false };
                  });
                }
                setNewQuestionName((state) => {
                  return { ...state, equ: e.target.value };
                });
              }}
            />
            {errors.equ && <p className="error">Equation can't be empty</p>}
          </div>

          <label for="Rule">
            Pick every variable from the equation and specify it's type.{" "}
          </label>
          <div>
            {newQuestionName.rule.map((elem, ind) => {
              return (
                <div key={ind}>
                  <input
                    className="mr-10"
                    placeholder="Variable"
                    value={newQuestionName.rule[ind].split("=")[0]}
                    onChange={(e) => {
                      setTouched((state) => {
                        return { ...state, rule: true };
                      });

                      if (
                        e.target.value.length < 1 ||
                        !newQuestionName.equ.includes(e.target.value.trim())
                      ) {
                        setErrors((state) => {
                          return { ...state, rule: true };
                        });
                      } else if (e.target.value.length === 1) {
                        setErrors((state) => {
                          return { ...state, rule: false };
                        });
                      }
                      setNewQuestionName((state) => {
                        let rules = [...state.rule];
                        rules.splice(ind, 1, `${e.target.value.trim()}=ints`);
                        return { ...state, rule: rules };
                      });
                    }}
                  />
                  :
                  <select
                    className="mr-10 ml-10"
                    name="cars"
                    onChange={(e) => {
                      setNewQuestionName((state) => {
                        let rules = [...state.rule];
                        let elem = rules[ind].split("=")[0];
                        if (!elem.length) {
                          return { ...state };
                        }
                        rules.splice(ind, 1, `${elem}=${e.target.value}`);
                        return { ...state, rule: rules };
                      });
                    }}
                  >
                    <option value="ints">Integers</option>
                    <option value="floats">Floats</option>
                  </select>
                  <button
                    className="var-button"
                    onClick={() => {
                      setNewQuestionName((state) => {
                        return { ...state, rule: [...state.rule, ""] };
                      });
                    }}
                  >
                    Add another variable
                  </button>
                </div>
              );
            })}
            {errors.rule && (
              <div className="error">
                Variables must be non-empty and part of the equation
              </div>
            )}
          </div>

          <label for="direction">
            Part of the question template that will be the same for every generated question. Doesn't include any variables{" "}
          </label>

          <div>
            <input
              id="direction"
              placeholder="Direction"
              value={newQuestionName.direction}
              onChange={(e) => {
                setTouched((state) => {
                  return { ...state, direction: true };
                });

                if (e.target.value.length < 1) {
                  setErrors((state) => {
                    return { ...state, direction: true };
                  });
                } else if (e.target.value.length === 1) {
                  setErrors((state) => {
                    return { ...state, direction: false };
                  });
                }

                setNewQuestionName((state) => {
                  return { ...state, direction: e.target.value };
                });
              }}
            />
            {errors.direction && (
              <p className="error">Direction can't be empty</p>
            )}
          </div>

          <label for="Answer">
            The mathematical expression(can include variables, numbers, mathmatical operators)
            that gives us the solution to any generated question from this template:{" "}
          </label>
          <div>
            <input
              id="Answer"
              placeholder="Answer"
              value={newQuestionName.answer}
              onChange={(e) => {
                
                
                setTouched((state) => {
                  return { ...state, answer: true };
                });

                let valid = undefined;
                try {
                  parse(e.target.value.trim());
                  if (e.target.value.trim().length === 0) valid = false;
                  else valid = true;
                } catch (ex) {
                  valid = false;
                }
                setErrors((state) => {
                  return { ...state, answer: !valid };
                });
                setNewQuestionName((state) => {
                  return { ...state, answer: e.target.value };
                });
              }}
            />
            {errors.answer && (
              <p className="error">
                Answer must be non-empty valid mathematical expression
              </p>
            )}
          </div>

          <div className="create-actions">
            <button
              className="button"
              onClick={() => {
                if (
                  !touched.equ ||
                  !touched.direction ||
                  !touched.answer ||
                  !touched.rule
                ) {
                  showErrors();
                  return;
                }
                  

                if (
                  errors.equ ||
                  errors.direction ||
                  errors.answer ||
                  errors.rule
                )
                  return;
                let rules = [...newQuestionName.rule];
                rules = rules.filter((elem) => elem !== "");
                rules = rules.join("|");

                let data = { ...newQuestionName, rule: rules };
                handleCreateQuestion(data);
                refreshInputs();
              }}
            >
              Create New Question
            </button>
            <button className="button" onClick={refreshInputs}>
              {" "}
              Cancel{" "}
            </button>
          </div>

        </Modal>
      )}

      {isModal2Open && (
        <Modal
          title="Enter the question numbers the generated test should have as comma separated values"
          Cancel={refreshInputs}
        >
          <input
            placeholder="Questions"
            value={testQuestions}
            onChange={(e) => {
              setTestQuestions(e.target.value);
            }}
          />

          <div className="create-actions">
            <button className="button" onClick={handleCreateTest}>
              Create Test
            </button>
            <button className="button" onClick={refreshInputs}>
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
                func={() => DeleteQuestion(question._id)}
                
                
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
      <br />
      <br />
      

    </div>
  );
}
