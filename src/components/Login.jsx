import React, { useRef, useState } from 'react';
import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';

// Database
const db = GUN();
// Gun User
const user = db.user().recall({sessionStorage: true});

let username;
let password;

user.get('alias').on(v => username=v)

db.on('auth', async(event) => {
    const alias = await user.get('alias'); // username string
    username = alias;
    console.log(`signed in as ${alias}`);
});

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
    console.log(username, password);
    user.auth(username, password, ({ err }) => console.log(err || 'signed in'));
}

function Login() {

    return (
        <form className="form-group">
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
        </form>
    );

}

export default Login;