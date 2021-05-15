import React, { Component } from "react";
import Pagination from "react-js-pagination";
import "./user.component.css";
import UserService from "../../services/user/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "bootstrap/dist/css/bootstrap.min.css";

export default class UserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      birthdayFromDate: "",
      birthdayToDate: "",
      createdFromDate: "",
      createdToDate: "",
      content: [],
      totalItems: 1000,
      totalPages: 1000,
      currentPage: 0,
      pageSize: 8
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmitForm(event) {
    this.getAllByPage()
    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.getAllByPage()
  }

  getAllByPage() {
    const { 
      username, 
      name, 
      birthdayFromDate, 
      birthdayToDate, 
      createdFromDate, 
      createdToDate, 
      currentPage, 
      pageSize 
    } = this.state

    UserService.getAllByPage(username, name, birthdayFromDate, birthdayToDate, 
      createdFromDate, createdToDate, currentPage, pageSize).then(
        response => {
          this.setState({
            content: response.data.content,
            totalItems: response.data.totalItems,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage
          });
        });
    }

  renderTableData() {
    return this.state.content.map((student, index) => {
      const { id, username, fullName, email, birthday, createdDate } = student
      return (
        <tr key={id}>
          <td>{this.state.currentPage * this.state.pageSize + index + 1}</td>
          <td>{username}</td>
          <td>{fullName}</td>
          <td>{email}</td>
          <td>{birthday}</td>
          <td>{createdDate}</td>
        </tr>
      )
    })
  }

  async handlePageChange(pageNumber) {
    await this.setState({ currentPage: pageNumber - 1 });
    this.getAllByPage()
  }

  handleSearch() {
    this.getAllByPage()
  }


  render() {
    return (
      <div className="container">
        <Form
          onSubmit={this.handleSubmitForm}
          className="border-form"
          ref={c => {
            this.form = c;
          }}
        >
          <h1 id='title'>Search user by:</h1>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <div className="col-md-3">
                    <label htmlFor="username">Username:</label>
                  </div>
                  <div className="col-md-9">
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <div className="col-md-3">
                    <label htmlFor="name">Name:</label>
                  </div>
                  <div className="col-md-9">
                    <Input
                      type="text"
                      className="form-control"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <div className="col-md-3">
                    <label htmlFor="birthdayFromDate">Birthday:</label>
                  </div>
                  <div className="col-md-9">
                    <Input
                      type="date"
                      className="form-control"
                      name="birthdayFromDate"
                      value={this.state.birthdayFromDate}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <div className="col-md-3">
                    <label htmlFor="birthdayToDate">to:</label>
                  </div>
                  <div className="col-md-9">
                    <Input
                      type="date"
                      className="form-control"
                      name="birthdayToDate"
                      value={this.state.birthdayToDate}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <div className="col-md-3">
                    <label htmlFor="createdFromDate">Created date:</label>
                  </div>
                  <div className="col-md-9">
                    <Input
                      type="date"
                      className="form-control"
                      name="createdFromDate"
                      value={this.state.createdFromDate}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <div className="col-md-3">
                    <label htmlFor="createdToDate">to:</label>
                  </div>
                  <div className="col-md-9">
                    <Input
                      type="date"
                      className="form-control"
                      name="createdToDate"
                      value={this.state.createdToDate}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group center">
                  <button className="btn btn-primary btn-block">Search</button>
                </div>
              </div>
            </div>
          </div>
        </Form>

        <h1 id='title'>List users</h1>
        <table id='table'>
          <thead>
            <tr>
              <th>STT</th>
              <th>Username</th>
              <th>Full name</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Created date</th>
            </tr>
          </thead>
          {this.state.content.length === 0 ?
            (<tbody>
              <tr>
                <td colSpan="6">no data</td>
              </tr>
            </tbody>)
            : (<tbody>
              {this.renderTableData()}
            </tbody>)
          }
        </table>
        {this.state.content.length !== 0 ? (
        <div>
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={this.state.currentPage}
            itemsCountPerPage={this.state.pageSize}
            totalItemsCount={this.state.totalItems}
            pageRangeDisplayed={this.state.totalPages}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>
        ) 
        : (<div></div>)}
      </div>
    );
  }
}