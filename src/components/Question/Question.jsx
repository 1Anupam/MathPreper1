import React from 'react';

import './question.css';

export default function Question({name, direction}) {
  return (
    <div className="question">
      <p> {name} </p>
      <p> {direction} </p>
    </div>
  );
}


