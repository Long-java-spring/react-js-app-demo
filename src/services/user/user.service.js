import axios from 'axios';
import authHeader from '../auth-jwt/auth-header';

const API_URL = 'http://localhost:3001/api/users/';

class UserService {

  getAllUsers() {
    return axios.get(API_URL + 'get-all', { headers: authHeader() });
  }

  getAllByPage(username, name, birthdayFromDate, birthdayToDate, createdFromDate, createdToDate, currentPage, pageSize) {
    return axios.post(API_URL + 'get-all-by-page', 
      {
        username: username.trim(),
        name: name.trim(), 
        birthdayFromDate: birthdayFromDate.trim(), 
        birthdayToDate: birthdayToDate.trim(), 
        createdFromDate: createdFromDate.trim(), 
        createdToDate: createdToDate.trim(), 
        page: currentPage, 
        size: pageSize
      }, {headers: authHeader()});
  }
}

export default new UserService();