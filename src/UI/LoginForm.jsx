import "./LoginForm.css";
import { useState } from "react";

const Form = ({ users, login }) => {
  const [info, setInfo] = useState({ userName: "", password: "" });
  function loginHandler() {
      let user = users.find(user => user.userName == info.userName && user.password == info.password);
      if (user) {
        login()
      }
  }

  return (
    <div className="form">
      <form className="register-form">
        <input type="text" placeholder="name" />
        <input type="password" placeholder="password" />
        <input type="text" placeholder="email address" />
        <button>create</button>
        <p className="message">
          Already registered? <a href="#">Sign In</a>
        </p>
      </form>
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
        <button onClick={loginHandler}>login</button>
        <p className="message">
          Not registered? <a href="#">Create an account</a>
        </p>
      </form>
    </div>
  );
};

export default Form;
