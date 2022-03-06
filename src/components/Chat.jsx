import React, { useRef, useState, useEffect } from "react";
import GUN from "gun";
import { user, db, username } from "../user";
import ChatMessage from "./ChatMessage";
import Login from "./Login";
// key for end-to-end encryption
const key = require("../secrets.json");
const sea = require("gun/sea");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  async function sendMessage() {
    const secret = await sea.encrypt(newMessage, key);
    const message = user.get("all").set({ what: secret });
    const index = new Date().toISOString();
    db.get("chat").get(index).put(message);
    setNewMessage("");
  }

  async function loadMessages() {
    var match = {
      ".": {
        ">": new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(),
      },
      "-": 1,
    };
    db.get("chat")
      .map(match)
      .once(async (data, id) => {
        if (data) {
          var message = {
            // transform the data
            who: await db.user(data).get("alias"), // a user might lie who they are! So let the user system detect whose data it is.
            what: (await sea.decrypt(data.what, key)) + "", // force decrypt as text.
            when: GUN.state.is(data, "what"), // get the internal timestamp for the what property.
          };
          if (message.what) {
            setMessages((prevState) =>
              [...prevState.slice(-100), message].sort(
                (a, b) => a.when - b.when
              )
            );
          }
        }
      });
  }

  useEffect(() => {
    loadMessages();
  }, []);
  if (user.is) {
    return (
      <div className="App">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-md-6">
              <main>
                {messages.length != 0
                  ? messages.map((message, key) => (
                      <ChatMessage key={key} message={message} user={user} />
                    ))
                  : null}
              </main>
            </div>
            <div class="input-group">
              <input
                placeholder="Type a message..."
                className="form-control"
                onChange={(e) => setNewMessage(e.target.value)}
                maxLength="100"
              />
              <button className="btn btn-primary" disabled={newMessage === ""} onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Login />;
}

export default Chat;
