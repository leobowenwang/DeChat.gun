import GUN from "gun";
import "gun/sea";
//import 'gun/axe';

// Database
export const db = GUN({
  peers: [
    `http://${process.env.PUBLIC_URL}:${port}/gun`,
    `http://localhost:8080/gun`,
  ],
});
// Gun User
export const user = db.user().recall({ sessionStorage: true });

export async function getUsername() {
  const alias = await user.get("alias");
  return alias;
}

db.on("auth", async (event) => {
  const alias = await user.get("alias");
  console.log(`signed in as ${alias}`);
});
