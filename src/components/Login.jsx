import React, {useState, useEffect} from "react";
import Chat from "./Chat";
import { user } from "../user";

let username = "";
let password = "";

async function signup() {
  user.create(username, password, function (ack) {
    if (!ack.pub) {
      alert(ack.err);
    } else {
      console.log(ack.pub);
      alert("user created, signing in");
      login();
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

function getRoom() {
  return localStorage.getItem("room");
}

function Login() {
  const [room, setRoom] = useState("");

  useEffect(() => {
    localStorage.setItem("room", room);
    console.log(room);
  }, [room]);
  
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
        onChange={(e) => (username = e.target.value)}
        minLength="3"
        maxLength="16"
      />
      Password
      <input
        name="password"
        className="form-control"
        onChange={(e) => (password = e.target.value)}
        type="password"
      />
      <button className="btn btn-primary" onClick={login}>
        Login
      </button>
      <button className="btn btn-success" onClick={signup}>
        Sign Up
      </button>
      <hr />
      <div className="input-group">
        <input
          placeholder="Room ID"
          className="form-control"
          name="room"
          value={room}
          onChange={e => setRoom(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" >
          Set
        </button>
      </div>
    </div>
  );
}

export default Login;
