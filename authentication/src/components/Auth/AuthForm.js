import { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-cotext";

import classes from "./AuthForm.module.css";
const API_KEY = "AIzaSyCMoT3QtsnG2AvRzh68-SFhtav8STEM7m4";
const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:";
    if (isLogin) {
      url = url + "signInWithPassword?key=" + API_KEY;
    } else {
      url = url + "signUp?key=" + API_KEY;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToekn: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        setIsLoading(false);
        if (resp.ok) {
          return resp.json();
        } else {
          resp.json().then((data) => {
            setIsLoading(false);
            let errorMessage = "Authentication Failed!";
            // throw new Error(errorMessage);
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
