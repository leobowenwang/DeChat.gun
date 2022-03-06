import React, { useRef, useState } from 'react';
import Chat from './Chat';
import { user } from '../user';

let username = '';
let password = '';

var pair = window.sessionStorage.getItem('pair');
console.log(pair)

async function signup() {
  user.create(username, password, function(ack) {
    if (!ack.pub) {
      alert(ack.err);
    } else {
      pair = ack.pub;
      console.log(ack.pub)
      console.log('user created');
    }
  });
}

function login() {
  user.auth(username, password, ({ err }) => {
    if (err) {
      alert(err);
    } else {
      window.location.reload();
    }
  });
}

function Login() {
  if (user.is) {
    return (
      <div className="App">
        <Chat />
      </div>
    );
  }
  
  return (
      <div className="App">
        Username
        <input
          name="username"
          className="form-control"
          onChange={e => username=e.target.value}
          minLength="3"
          maxLength="16"
        />
        Password
        <input
          name="password"
          className="form-control"
          onChange={e => password=e.target.value}
          type="password"
        />
        <button className="btn btn-primary" onClick={login}>
          Login
        </button>
        <button className="btn btn-success" onClick={signup}>
          Sign Up
        </button>
      </div>
  );
}

export default Login;