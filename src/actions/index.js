import axios from 'axios';
import { LOGIN, REGISTER, AUTH, LOGOUT } from '../constants/types';
import * as Config from '../utils/config.json';

export function registerUser(dataToSubmit) {
  const request = axios.post(`${Config.user_server}/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER,
    payload: request
  }
}

export function loginUser(dataToSubmit) {
  const request = axios.post(`${Config.user_server}/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN,
    payload: request
  }
}

export function auth() {
  const request = axios.get(`${Config.user_server}/auth`)
    .then(response => response.data);

  return {
    type: AUTH,
    payload: request
  }
}

export function logoutUser() {
  const request = axios.get(`${Config.user_server}/logout`)
    .then(response => response.data);

  return {
    type: LOGOUT,
    payload: request
  }
}