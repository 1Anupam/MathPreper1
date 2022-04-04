import React, { useState} from 'react';
import {useHistory} from 'react-router-dom';
import './home.css';
import logo from '../../imgs/logo.jpeg'

export default function Home(){
  const history = useHistory();
  

  function navigateToPage(path) {
    history.push(path);
  }



  

  return (
    <div className="content">
      
      <header id="header-home">
      <div className="container">
        <nav id="main-nav">
          <img src={logo} alt="MP" id="logo" />
          <button onClick={() => navigateToPage('/users')} className="lead ">Logout</button>
          
        </nav>
        <div className="header-content">
          <h1>
            MathPrepper
            
          </h1>
          <p className="lead">
            Master any math question! Ace your exams!
          </p>
          
          <button
        onClick={() => navigateToPage('/rooms')}
        className="page-button btn-light"
      >View All Questions</button>
          <button
        onClick={() => navigateToPage('/users')}
        className="page-button btn-light"
      >
        View All Test Questions
      </button>
      
      
        </div>
      </div>
    </header>

    </div>
  );
};

