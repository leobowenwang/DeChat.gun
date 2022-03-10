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
        <span>
          Welcome <strong>{username}</strong>
        </span>
        <img
          src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
          className="avatar"
          alt="avatar"
        />

        <div className="form-inline">
          <button className="btn btn-danger" onClick={delete_acc}>
            Delete Account
          </button>
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

      <div className="user-bio">
        <h3 className="text-center">DeChat.gun</h3>
      </div>
    </div>
  );
}
export default Header;
