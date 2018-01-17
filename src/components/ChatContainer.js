import React from 'react';
import Header from "./Header";

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    firebase.auth().signOut();
  };

  render () {
    return (
      <div id="ChatContainer" className="inner-container">
        <Header>
          <button className="red" onClick={this.handleLogout}>Logout</button>
        </Header>
        <div id="message-container">
        </div>
        <div id="chat-input">
          <textarea placeholder="Add your message..." />
          <button>
            <svg viewBox="0 0 24 24">
              <path fill="#424242" d="M2, 21L23, 12L2, 3V10L17, 12L2, 14V21Z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default ChatContainer;
