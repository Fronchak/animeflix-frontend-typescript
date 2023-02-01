import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { CategoryName } from '../types/domain/CategoryName';

export const BASE_URL = 'http://localhost:8080';

const CLIENT_ID = "myclientid";
const CLIENT_SECRET = "myclientsecret";
const AUTH_DATA = 'authData';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
};

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

export const saveAuthData = (loginResponse: LoginResponse) => {
  localStorage.setItem(AUTH_DATA, JSON.stringify(loginResponse));
}

export const getAuthData = () => {
  const rawObj = localStorage.getItem(AUTH_DATA) ?? '{}';
  return JSON.parse(rawObj) as LoginResponse;
}

export const requestBackend = (config: AxiosRequestConfig) => {

  const headers = config.withCredentials ? {
    Authorization: 'Bearer ' + getAuthData().access_token
  } : config.headers;

  const newConfig: AxiosRequestConfig = { ...config, headers, baseURL: BASE_URL };

  return axios(newConfig);
}

export const requestAllCategoryNames = async(): Promise<CategoryName[]> => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    url: '/categories/all',
    method: 'get'
  }
  const response = await axios(config);
  const categories = response.data as CategoryName[];
  return categories;
}

export const getParamsToAnimePageFromRequest = (request: Request) => {
  const url = new URL(request.url);
  const filter = url.searchParams.get("filter") || "";
  const categoryId = url.searchParams.get("categoryId") || 0;
  const page = url.searchParams.get("page") || 0;
  return {
    filter,
    categoryId,
    page,
    size: 3
  }
}
