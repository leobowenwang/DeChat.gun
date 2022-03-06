import React, { useRef, useState } from 'react';
import GUN from 'gun';
import { user, db } from '../user';
import ChatMessage from './ChatMessage';
// key for end-to-end encryption
const key = require("../secrets.json");
const sea = require('gun/sea')

let newMessage = '';

async function sendMessage() {
  const secret = await sea.encrypt(newMessage, key);
  const message = user.get('all').set({ what: secret });
  const index = new Date().toISOString();
  db.get('chat').get(index).put(message);
  newMessage = '';
}

function logout() {
  user.leave();
  console.log('signed out.');
  window.location.reload();
}

function delete_acc() {
  user.delete(username, password, ({ err }) => {
    if (err) {
      alert(err);
    } else {
      console.log('account deleted.');
      //window.location.reload();
    }
  });
}

  

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  async function loadMessages() {
    var match = {
      '.': {
        '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(),
      },
      '-': 1,
    };
    db.get('chat')
        .map(match)
        .once(async (data, id) => {
          if (data) {
            var message = {
              // transform the data
              who: await db.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
              what: (await sea.decrypt(data.what, key)) + '', // force decrypt as text.
              when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
            };
            if (message.what) {
              setMessages([...messages.slice(-100), message].sort((a, b) => a.when - b.when))
              console.log(messages)
            }
          }
        });
  }
  loadMessages();
  if (user.is) {
    return (
        <div className="App">
          <header>
            <h1>🔥💬</h1>
          </header>
          <section>
            <button className="login" onClick={logout}>
              Logout
            </button>
            <button className="login" onClick={delete_acc}>
              Delete Account
            </button>
          </section>
          <section>
              <main>
                {messages.length!=0 ? messages.map((message, key) => (
                  <ChatMessage key={key} message={message} user={user} />
                )) : null}
              </main>
              <input placeholder="Type a message..." onChange={e => setNewMessage(e.target.value)} maxLength="100" />
              <button disabled={newMessage===''} onClick={sendMessage}>💥</button>
          </section>
        </div>
    );
  }
}

export default Chat