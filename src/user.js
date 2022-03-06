import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';

// Database
export const db = GUN();
// Gun User
export const user = db.user().recall({sessionStorage: true});

export let username;

user.get('alias').on(v => username=v)

db.on('auth', async(event) => {
    const alias = await user.get('alias');
    username = alias;
    console.log(`signed in as ${alias}`);
});

export default user;