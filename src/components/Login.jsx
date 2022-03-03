import React, { useRef, useState } from 'react';
import { user } from '../user';

let username = '';
let password = '';

function signup() {
    user.get('alias').put(username);
    user.create(username, password, ({ err }) => {
        if (err) {
            alert(err);
        } else {
            console.log('user created');
        }
    });
}

function login() {
    user.auth(username, password, ({ err }) => console.log(err || 'signed in'));
}

function Login() {
    return (
        <div className="form-group">
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
          <button className="login" onClick={login}>
            Login
          </button>
          <button className="login" onClick={signup}>
            Sign Up
          </button>
        </div>
    );

}

export default Login;