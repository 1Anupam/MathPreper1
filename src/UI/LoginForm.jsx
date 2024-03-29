import "./LoginForm.css";
import { useState } from "react";
import axios from "axios";

const Form = ({ login }) => {
  const [info, setInfo] = useState({ userName: "", password: "" });
  const [signingIn, setSigningIn] = useState(false);
  function loginHandler(e) {
    e.preventDefault();
    axios.post("https://mathpreper.onrender.com/api/checkUser", info).then((res) => login(info.userName)).catch(err => alert('Wrong credentials! Try loggin in again'));
    
  }

  function signInHandler(e) {
    e.preventDefault();
  
    if (info.userName.length <= 1 || info.password.length < 1) return;
    
    axios.post(`https://mathpreper.onrender.com/users`, info);
    axios.post(`https://mathpreper.onrender.com/problems`, {
      answer: "(c-b)/x",
      direction:"solve for x",
      equ: "ax+b=c",
      rule: "a=ints|b=ints|c=ints",
      user: info.userName
    })
    login(info.userName);
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
            <br />
            Or{" "}
            <span onClick={() => login('user1')}>Use test account</span>
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
