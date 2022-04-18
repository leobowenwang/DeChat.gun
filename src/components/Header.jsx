import React, { useEffect, useState } from "react";
import { user, getUsername } from "../user";

var pair = window.sessionStorage.getItem("pair");
console.log(pair);

function logout() {
  user.leave();
  console.log("signed out.");
  localStorage.removeItem("gun/");
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
        <a href="/">
          <img
            src={`logo.png`}
            id="logo"
            className="img-fluid"
            alt="DeChat.gun"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
          <button type="button" className="btn btn-secondary " disabled>
            Room: {localStorage.getItem("room")}
          </button>
          <div className="form-inline" id="logoutbtn">
            <button className="btn btn-warning" onClick={logout}>
              Logout
            </button>
          </div>
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
