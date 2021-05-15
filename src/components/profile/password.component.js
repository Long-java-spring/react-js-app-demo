import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthService from "../../services/auth-jwt/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

toast.configure();

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      loading: false,
      message: ""
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleChangePassword(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    const { currentPassword, newPassword, confirmPassword } = this.state;

    if (currentPassword !== '' && currentPassword === newPassword) {
        toast.error("New password and old password cann't match");
    } else if (newPassword !== null && newPassword !== null && newPassword !== confirmPassword) {
        toast.error("Passwords don't match");
    }

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.changePassword(currentPassword, newPassword).then(
        () => {
            this.setState({
                loading: true,
              });
            toast.success("Change password successfully!")
            AuthService.logout();
            this.props.history.push("/login");
            window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-login">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleChangePassword}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="currentPassword">Current password<span className="text-required"> *</span></label>
              <Input
                type="password"
                className="form-control"
                name="currentPassword"
                value={this.state.currentPassword}
                onChange={this.handleInputChange}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New password<span className="text-required"> *</span></label>
              <Input
                type="password"
                className="form-control"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.handleInputChange}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password<span className="text-required"> *</span></label>
              <Input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleInputChange}
                validations={[required]}
              />
            </div>

            <div className="form-group center">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Update password</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}