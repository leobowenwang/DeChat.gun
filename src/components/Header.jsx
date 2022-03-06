import { user, username } from "../user";

function signout() {
  user.leave();
  username.set("");
}

function Header() {
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <img src={`logo.png`} id="logo" className="img-fluid" alt="DeChat.gun" />

      {username ? (
        <div className="user-bio">
          <span>
            Hello <strong>{username}</strong>
          </span>
          <img
            src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
            alt="avatar"
          />

          <button className="signout-button" onClick={signout}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="user-bio">
          <h3 className="text-center">DeChat.gun</h3>
        </div>
      )}
    </div>
  );
}
export default Header;
