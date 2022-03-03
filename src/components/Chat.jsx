import React, { useRef, useState } from 'react';

function Chat() {


    return (
        <div className="App">
          <header>
            <h1>⚛️🔥💬</h1>
            <SignOut />
          </header>
    
          <section>
            {user ? <ChatRoom /> : <SignIn />}
          </section>
    
        </div>
    );

}