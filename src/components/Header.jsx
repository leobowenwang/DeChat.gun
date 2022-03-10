import React, { useEffect, useState } from "react";
import { user, getUsername } from "../user";

var pair = window.sessionStorage.getItem("pair");
console.log(pair);

async function resetUsername() {
  await user.get("alias").put(null);
  return true;
}

function logout() {
  user.leave();
  console.log("signed out.");
  window.location.reload();
}

function delete_acc() {
  //fixme
  //localStorage.clear();
  /*user.delete(pair, ({ err }) => {
    if (err) {
      alert(err);
    } else {
      console.log("account deleted.");
      //window.location.reload();
    }
  });*/
  resetUsername().then((e) => {
    window.alert("deleted account, return to login page.");
    window.location.reload();
  });
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
      <div className="navbar navbar-expand-lg navbar-light bg-light">
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
        <div className="form-inline">
          <button className="btn btn-danger" onClick={delete_acc}>
            Delete
          </button>
          &nbsp;
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
