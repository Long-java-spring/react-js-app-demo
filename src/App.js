import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FaUser } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { GrUserManager } from "react-icons/gr";
import { IoMdContacts } from "react-icons/io";
import { IoHelpCircleOutline } from "react-icons/io5";

import AuthService from "./services/auth-jwt/auth.service";

import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";
import Profile from "./components/profile/profile.component";
import PasswordComponent from "./components/profile/password.component";
import UserComponent from "./components/user/user.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      isActive: false,
      pathname: window.location.pathname
    };

    this.onClick = this.onClick.bind(this);
    this.getLocationPathname = this.getLocationPathname.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    AuthService.logout();
  }


  onClick() {
    this.setState({ isActive: !this.state.isActive });
  }

  getLocationPathname() {
    this.setState({ pathname: window.location.pathname });
  }

  render() {
    const { currentUser } = this.state;
    if ((window.location.pathname === "/" || window.location.pathname === "/login") && currentUser && currentUser.id) {
      window.location.pathname = "/user";
    }
    return (
      <div id="fullheight">
        <nav className="navbar navbar-expand navbar-dark">
          {currentUser && currentUser.id ? (
            <div className="navbar-nav ml-auto">
              <div className="nav-item-flex">
                <div className="nav-item-flex-item">
                  <li className="nav-item">
                    <Link className="nav-link nav-link-first">
                      <AiFillHome className="icon-style" />
                      Home
                    </Link>
                  </li>
                </div>
                <div className="nav-item-flex-item">
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      <GrUserManager className="icon-style" />
                      User
                    </Link>
                  </li>
                </div>
                <div className="nav-item-flex-item">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      <IoMdContacts className="icon-style" />
                      Contact
                    </Link>
                  </li>
                </div>
                <div className="nav-item-flex-item">
                  <li className="nav-item">
                    <Link className="nav-link">
                      <IoHelpCircleOutline className="icon-style" />
                      Help
                    </Link>
                  </li>
                </div>
              </div>
              <div className="nav-item-login">
                <li className="nav-item">
                  <div className="menu-container">
                    <button onClick={this.onClick} className="menu-trigger"><FaUser className="icon-style" />{currentUser.username}<MdArrowDropDown className="icon-style" /></button>
                    <nav className={`menu ${this.state.isActive ? 'active' : 'inactive'}`}>
                      <ul>
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/user">Manager users</a></li>
                        <li><a href="/login" onClick={this.logOut}>LogOut</a></li>
                      </ul>
                    </nav>
                  </div>
                </li>
              </div>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <div className="nav-item-flex"></div>
              <div className="nav-item-login">
                {window.location.pathname === "/register" ? (
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link" onClick={this.getLocationPathname}>
                      Sign In
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link" onClick={this.getLocationPathname}>
                      Sign Up
                    </Link>
                  </li>
                )}
              </div>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={UserComponent} />
            <Route path="/change-password" component={PasswordComponent} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;