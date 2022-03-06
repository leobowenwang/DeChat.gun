import React, { useRef, useState } from "react";
import Login from "./Login";
import ChatMessage from "./ChatMessage";
import { user, username } from "../user";

function Chat() {
  return (
    <div className="App">
      <section>{username ?  <Login />: <ChatMessage />}</section>
    </div>
  );
}
export default Chat;
