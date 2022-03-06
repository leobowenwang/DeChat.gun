import { user, username } from "../user";

function signout() {
  user.leave();
  username.set('');
}

function Header() {
  return (
    <header>
      <h1>🔫💬</h1>
      <section>
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
        ):(
          <div className="user-bio">
            <h3>Gun.js Chat</h3>
          </div>
        )}
      </section>
    </header>
  );
}
export default Header;
