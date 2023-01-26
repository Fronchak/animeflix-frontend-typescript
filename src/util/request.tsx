import axios from 'axios';
import qs from 'qs';

export const BASE_URL = 'http://localhost:8080';

const CLIENT_ID = "myclientid";
const CLIENT_SECRET = "myclientsecret";

const basicHeader = () => {
  return `Basic ${ window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`) }`;
}

type LoginData = {
  username: string;
  password: string;
}

export const requestBackendLogin = (loginData: LoginData) => {

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: basicHeader()
  }

  const data = qs.stringify({
    username: loginData.username,
    password: loginData.password,
    grant_type: 'password'
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers
  });

}
