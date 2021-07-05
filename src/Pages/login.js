import React from "react";
import axios from "axios";
import makeToast from "../Toaster";
import {useHistory, withRouter} from 'react-router-dom';

const LoginPage = (props) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  let history = useHistory();

  const loginUser = (props) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
    .post("http://localhost:8000/user/login", {
      email,
      password
    })
    .then(response => {
      console.log(response.data);
      makeToast("success", response.data.message);
      localStorage.setItem("chatToken",response.data.token);
      history.push("/dashboard");
      props.setUpSocket();
    })
    .catch(err => {
      // console.log(err);
      if(err && err.response && err.response.data && err.response.data.message)
      makeToast("error", err.response.data.message);
    });
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email"> Email </label>
          <input type="email" name="email" id="email" placeholder="Enter email id" ref={emailRef}/>
          <label htmlFor="password"> Password </label>
          <input type="password" name="password" id="password" placeholder="Enter password" ref={passwordRef}/>
        </div>
        <button onClick={loginUser}>Login</button>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);
