import React, { Component } from "react";
import "antd/dist/antd.css";
import "./Navbar.css";
import Searchbar from "./Searchbar";
import { Menu } from "semantic-ui-react";
import avatar from "./default-avatar.png";
import fire from "../../fire";

class Navbar extends Component {
  state = {
    userName: "Piotr"
  };

  handleItemClick = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        localStorage.setItem("isAuthenticated", "false");
        this.props.history.push("/");
      });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <div className="navbar">
        <Menu>
          <Menu.Item onClick={this.handleItemClick}>
            <div className="navbar-logo" />
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item>
              <Searchbar />
            </Menu.Item>
            <Menu.Item>
              <img className="navbar-user-container-avatar" src={avatar} />
              <div className="navbar-user-container-name">
                {" "}
                Cześć {this.state.userName}
              </div>
            </Menu.Item>

            <Menu.Item
              name="help"
              active={activeItem === "help"}
              onClick={this.handleItemClick}
            >
              Wyloguj
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
