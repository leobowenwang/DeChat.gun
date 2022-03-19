import GUN from "gun";
import "gun/sea";
import "gun/axe";

// Database
export const db = GUN(`${process.env.REACT_APP_RELAY}/gun`);
export const dbname = process.env.REACT_APP_DBNAME;
// Gun User
export const user = db.user().recall({ sessionStorage: true });

export async function getUsername() {
  const alias = await user.get("alias");
  return alias;
}

db.on(dbname, async (event) => {
  const alias = await user.get("alias");
  console.log(`signed in as ${alias}`);
});
