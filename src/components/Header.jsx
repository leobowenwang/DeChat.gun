import React, { useEffect, useState } from "react";
import { user, getUsername } from "../user";

var pair = window.sessionStorage.getItem("pair");
console.log(pair);

function logout() {
  user.leave();
  console.log("signed out.");
  window.location.reload();
}

function Header() {
  const [username, setUsername] = useState("");

  if (user.is) {
    useEffect(() => {
      getUsername().then((username) => {
        setUsername(username);
      });
    }, []);
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <img
          src={`logo.png`}
          id="logo"
          className="img-fluid"
          alt="DeChat.gun"
        />
        <div className="mx-auto order-0">
          <span>
            Welcome <strong>{username}</strong> &nbsp;
          </span>
          <img
            src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
            className="avatar"
            alt="avatar"
          />
        </div>
        <button type="button" class="btn btn-secondary " disabled>
          Room: {localStorage.getItem("room")}
        </button>
        <div className="form-inline">
          <button className="btn btn-warning" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <img src={`logo.png`} id="logo" className="img-fluid" alt="DeChat.gun" />
      <ul className="navbar-nav ms-auto">
        <span className="text-muted">
          by&nbsp;
          <a
            href="https://github.com/uknow4real"
            target="_blank"
            className="link-secondary"
          >
            Sebastian Chmel
          </a>
          &nbsp;&&nbsp;
          <a
            href="https://github.com/leobowenwang"
            target="_blank"
            className="link-secondary"
          >
            Leo Wang
          </a>
          &nbsp;
        </span>
      </ul>
    </div>
  );
}
export default Header;
