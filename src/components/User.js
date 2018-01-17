import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

class User extends React.Component {
  render() {
    return (
      <div id="UserContainer">
        <Header>
          <Link to="/">
            <button className="red">
              Back to chat
            </button>
          </Link>
        </Header>
        <h1>Hello from User for User {this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default User;
