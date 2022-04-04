import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import QuestionItem from '../../components/Question/Question';

import './users.css';

export default function Users() {
  const [users, setUsers] = useState(undefined);
  const [error, setError] = useState(undefined);

  const [refresh, setRefresh] = useState(0);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [newUserName, setNewUserName] = useState('');

  const history = useHistory();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/tests/list')
      .then((response) => {
        if (response.data){
          setUsers(response.data);
        }
      })
      .catch(error => {
        setError(error);
        console.log(error);
      });
  }, [refresh])

  

  return (
    <div className="content">
      {/* {isModalOpen && 
        <div className="create-modal">
          <input
            className="user-input"
            placeholder="User Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <div className="create-actions">
            <button className="button" onClick={handleCreateUser}>Create New User</button>
            <button className="button" onClick={() => setIsModalOpen(false)}> Cancel </button>
          </div>
        </div>
      } */}
  
      <div className="rooms-header">
        <h1>Tests</h1>
        <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<--"}Go Back Home
        </button>
      </div>

      {error && (
        <div className="rooms-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className="test-list">
        {users ? users.map((question, index) => (
          <QuestionItem
          key={`${question.questionName}-${index}`}
          name={question.equ}
          direction={question.direction}
        />
        )) : (
          <div className="rooms-empty">
            <p>Sorry there are no rooms right now... Come back later </p>
          </div>
        )}
      </div>

      {/* <div>
        <button className="page-button" onClick={() => setIsModalOpen(true)}> Add New User </button>
      </div> */}
    </div>
  )
}
