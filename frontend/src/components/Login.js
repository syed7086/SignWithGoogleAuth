import React from "react";
import "./login.css";
const login = () => {

  const loginWithGoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self")
  }

  return (
    <>
      <div className="login-page">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            <p className="message">Not Registered? <a href="#"> Create an account </a></p>
          </form>
          <button className="login-with-google-btn" onClick={loginWithGoogle}>
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default login;
