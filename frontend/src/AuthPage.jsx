import { useState } from "react";
import axios from "axios";

const AuthPage = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
 // const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [loginError, setLoginError] = useState("");
 // const [emailError, setEmailError] = useState(""); // New state variable for email error
  const [signupError, setSignupError] = useState("");
  const [signupFirstNameError, setSignupFirstNameError] = useState("");
  const [usernameTakenError, setUsernameTakenError] = useState(""); // New state variable for username taken error


  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret }))
      .catch((e) => {
        setLoginError("Incorrect username or password.");
        console.log(JSON.stringify(e.response.data));
      });
  };

  const onSignup = (e) => {
    e.preventDefault();
    if (!username || !secret) {
      setSignupError("Username and password are required."); // Set the signup error message
      return;
    }
    if (!first_name) {
      setSignupFirstNameError("First Name are required."); // Set the signup error message
      return;
    }
    // Validate email format
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   setEmailError("Invalid email format."); // Set the email error message
    //   return;
    // }

    axios
      .post("http://localhost:3001/signup", {
        username,
        secret,
       // email,
        first_name,
        last_name,
      })
      .then((r) => props.onAuth({ ...r.data, secret }))
      .catch((e) => {
        if (e.response.status === 400) {
          setUsernameTakenError("Username is already taken.");
        } else {
          console.log(JSON.stringify(e.response.data));
        }
      });
  };

  return (
    <div className="login-page">
      <div className="card">
        {/* Login Form */}
        <form onSubmit={onLogin}>
          <div className="title">Login</div>
          {loginError && <div className="error">{loginError}</div>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            onChange={(e) => setSecret(e.target.value)}
          />
          <button type="submit">LOG IN</button>
        </form>

        {/* Sign Up Form */}
        <form onSubmit={onSignup}>
          <div className="title">or Sign Up</div>
          {signupError && <div className="error">{signupError}</div>} {/* Show the signup error message */}
          {usernameTakenError && <div className="error">{usernameTakenError}</div>} {/* Show the username taken error message */}
          <input
            type="text"
            name="username"
            placeholder="Username*"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password*"
            onChange={(e) => setSecret(e.target.value)}
          />
          {/* {emailError && <div className="error">{emailError}</div>} 
          <input
            type="text"
            name="email"
            placeholder="Email*"
            onChange={(e) => setEmail(e.target.value)}
          /> */}
          {signupFirstNameError && <div className="error">{signupFirstNameError}</div>} 
          <input
            type="text"
            name="first_name"
            placeholder="First name*"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="submit">SIGN UP</button>
        </form>
      </div>

      <style>{`
      .login-page { width: 100vw; height: 100vh; padding-top: 6vw; background: linear-gradient(180deg, rgba(117,84,160,1) 7%, rgba(117,84,160,1) 17%, rgba(106,95,168,1) 29%, rgba(99,103,174,1) 44%, rgba(87,116,184,1) 66%, rgba(70,135,198,1) 83%, rgba(44,163,219,1) 96%, rgba(22,188,237,1) 100%, rgba(0,212,255,1) 100%); }
      .card { width: 200px; position: relative; left: calc(50vw - 100px); text-align: center; }
      .title { padding-top: 32px; font-size: 22px; color: white; font-weight: 700; }
      input { width: calc(100% - 16px); margin-top: 12px; padding: 8px; background-color: #e6f7ff; outline: none; border: 1px solid #e6f7ff; }
      button { margin-top: 12px; width: 100%; padding: 8px; }
      .error { color: red; margin-top: 12px; } /* Style for the error message */
      `}</style>
    </div>
  );
};

export default AuthPage;
