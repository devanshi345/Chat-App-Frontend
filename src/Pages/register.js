import React from "react";
import axios from "axios";
import makeToast from "../Toaster";
import {useHistory} from 'react-router-dom';

const RegisterPage = (props) => {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  let history = useHistory();

  const registerUser = (props) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
    .post("http://localhost:8000/user/register", {
      name,
      email,
      password
    })
    .then(response => {
      // console.log(response.data);
      makeToast("success", response.data.message);
      history.push("/login");
    })
    .catch(err => {
      // console.log(err);
      makeToast("error", err.response.data.message);
    });
  };

  return (
    <div className="card">
      <div className="cardHeader">Register</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="name"> Name </label>
          <input type="text" name="name" id="name" placeholder="Enter your name" ref = {nameRef}/>

          <label htmlFor="email"> Email </label>
          <input type="email" name="email" id="email" placeholder="Enter email id" ref = {emailRef}/>

          <label htmlFor="password"> Password </label>
          <input type="password" name="password" id="password" placeholder="Enter password" ref = {passwordRef}/>
        </div>
        <button onClick = {registerUser}>Register</button>
      </div>
    </div>
  );
}

export default RegisterPage;
