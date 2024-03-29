import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Questions from "./pages/Questions/Questions";
import Users from "./pages/Users/Users";
import { useState } from "react";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState({
    isLoggedIn: false,
    userName: undefined,
  });

  return (
    <div className="root">
      <div>
        <Router>
          <Switch>
            <Route exact={true} path={"/"}>
              <Home
                login={(user) => {
                  setLoggedIn({ isLoggedIn: true, userName: user });
                }}
                loggedIn={loggedIn.isLoggedIn}
              />
            </Route>
            <Route exact={true} path={"/questions"}>
              {loggedIn.isLoggedIn ? (
                <Questions user={loggedIn.userName} />
              ) : (
                <Home
                  login={(user) => {
                    setLoggedIn({ isLoggedIn: true, userName: user });
                  }}
                  loggedIn={loggedIn.isLoggedIn}
                />
              )}
            </Route>
            <Route exact={true} path={"/test-questions"}>
              {loggedIn.isLoggedIn ? (
                <Users user={loggedIn.userName} />
              ) : (
                <Home
                  login={(user) => {
                    setLoggedIn({ isLoggedIn: true, userName: user });
                  }}
                  loggedIn={loggedIn.isLoggedIn}
                />
              )}
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
