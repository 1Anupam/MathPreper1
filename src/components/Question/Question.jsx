import React from "react";

import classes from './question.module.css';

export default function Question({ name, direction, rule }) {
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.price}>{direction}</div>
        
      </div>
      <div className={classes.description}>{rule}</div>
    </li>
  );
}
