import { user, username } from "../user";

function logout() {
  user.leave();
  console.log("signed out.");
  window.location.reload();
}

function delete_acc() {
  user.delete(username, password, ({ err }) => {
    if (err) {
      alert(err);
    } else {
      console.log("account deleted.");
      //window.location.reload();
    }
  });
}

function Header() {
  if (user.is) {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <img
          src={`logo.png`}
          id="logo"
          className="img-fluid"
          alt="DeChat.gun"
        />

        <div className="user-bio">
          <span>
            Hello <strong>{username}</strong>
          </span>
          <img
            src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
            alt="avatar"
          />

          <section>
            <button className="btn btn-warning" onClick={logout}>
              Logout
            </button>
            <button className="btn btn-danger" onClick={delete_acc}>
              Delete Account
            </button>
          </section>
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
