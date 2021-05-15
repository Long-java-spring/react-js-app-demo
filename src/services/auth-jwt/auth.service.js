import axios from "axios";
import authHeader from '../auth-jwt/auth-header';

const API_URL = "http://localhost:3001/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, firstName, lastName, birthday) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password, 
      firstName, 
      lastName, 
      birthday
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  changePassword(currentPassword, newPassword) {
    return axios.put(API_URL + "change-password", {
      currentPassword,
      newPassword
    }, {headers: authHeader()});
  }
}

export default new AuthService();