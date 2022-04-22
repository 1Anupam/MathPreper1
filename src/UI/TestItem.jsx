import React from "react";
import { useState } from "react";

import classes from "./testitem.module.css";

export default function Question({ name, direction, rule }) {
  const [answerIsVisible, setAnswerIsVisible] = useState(false);

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.price}>{direction}</div>
      </div>

      <div className={classes.price}>
          {!answerIsVisible && <button onClick={() => setAnswerIsVisible(true)}>Show Answer</button>}
          {answerIsVisible && <button onClick={() => setAnswerIsVisible(false)}>Hide Answer</button>}
        {answerIsVisible && rule}
      </div>
    </li>
  );
}
