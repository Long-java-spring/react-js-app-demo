import React, { Component } from "react";
import AuthService from "../../services/auth-jwt/auth.service";
import Form from "react-validation/build/form";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };

    this.onHandleChangePassword = this.onHandleChangePassword.bind(this);
  }
  
  onHandleChangePassword(event) {
    event.preventDefault();
    this.props.history.push("/change-password");
    window.location.reload();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <div className="row">
          <header className="jumbotron">
            <h3>
              Profile: <strong>{currentUser.fullName}</strong>
            </h3>
          </header>
          <div className="col-md-2">
            <span>
              <strong>username:</strong>
            </span>
          </div>
          <div className="col-md-10">
            <span>
              {currentUser.username}
            </span>
          </div>
          <div className="col-md-2">
            <span>
              <strong>Email:</strong>
            </span>
          </div>
          <div className="col-md-10">
            <span>
              {currentUser.email}
            </span>
          </div>
          <div className="col-md-2">
            <span>
              <strong>Date of birth:</strong>
            </span>
          </div>
          <div className="col-md-10">
            <span>
              {currentUser.birthday}
            </span>
          </div>
          <div className="col-md-2">
            <span>
              <strong>Created date:</strong>
            </span>
          </div>
          <div className="col-md-10">
            <span>
              {currentUser.createdDate}
            </span>
          </div>
          <Form
            onSubmit={this.onHandleChangePassword}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <button className="btn btn-primary">Change password</button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}