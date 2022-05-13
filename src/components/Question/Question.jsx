import React from "react";

import classes from "./question.module.css";

export default function Question({ name, direction, rule, func, edit, }) {
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.price}>{direction}</div>
      </div>
      <div className={classes.description}>
        
        <button className={classes.delete} onClick={func}>Delete Question</button>
      </div>
    </li>
  );
}
