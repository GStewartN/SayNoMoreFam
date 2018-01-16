import React from 'react';
import Header from "./Header";

class ChatContainer extends React.Component {
  render () {
    return (
      <div id="ChatContainer">
        <Header />
        <h1>Hello from ChatContainer</h1>
      </div>
    );
  }
}

export default ChatContainer;
