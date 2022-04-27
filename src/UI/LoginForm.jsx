import "./LoginForm.css";
import { useState } from "react";
import axios from "axios";

const Form = ({ users, login }) => {
  const [info, setInfo] = useState({ userName: "", password: "" });
  const [signingIn, setSigningIn] = useState(false);
  function loginHandler() {
    let user = users.find(
      (user) =>
        user.userName === info.userName && user.password === info.password
    );
    if (user) {
      login();
    }
  }

  function signInHandler() {
    if (info.userName.length <= 1 || info.password.length <= 1) return;

    axios.post(`https://mathpreper.herokuapp.com/users/create`, info);
    login();
      
  }

  return (
    <div className="form">
      <form className="login-form">
        <input
          type="text"
          placeholder="username"
          value={info.userName}
          onChange={(e) =>
            setInfo((state) => {
              return { ...state, userName: e.target.value };
            })
          }
        />
        <input
          type="password"
          placeholder="password"
          value={info.password}
          onChange={(e) =>
            setInfo((state) => {
              return { ...state, password: e.target.value };
            })
          }
        />
        {!signingIn && <button onClick={loginHandler}>login</button>}
        {signingIn && <button onClick={signInHandler}>SignUp</button>}
        {!signingIn && (
          <p className="message">
            Not registered?{" "}
            <span onClick={() => setSigningIn(true)}>Create an account</span>
          </p>
        )}
        {signingIn && (
          <p className="message">
            Already registered?{" "}
            <span onClick={() => setSigningIn(false)}>
              Login to your account
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Form;
