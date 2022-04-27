import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './pages/Home/Home';
import Questions from './pages/Questions/Questions';
import Users from './pages/Users/Users';
import { useState } from 'react';

import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="root">
      <div >
        <Router>
          <Switch>
            <Route exact={true} path={'/'}>
              <Home login={() => setLoggedIn(true)} loggedIn= {loggedIn}/>
            </Route>
            <Route exact={true} path={'/rooms'}>
              <Questions />
            </Route>
            <Route exact={true} path={'/users'}>
              <Users />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
