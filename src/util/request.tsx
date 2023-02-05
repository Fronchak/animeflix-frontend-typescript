import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import jwtDecode from 'jwt-decode';
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

type Role = 'ROLE_WORKER' | 'ROLE_ADMIN' | 'ROLE_USER';

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
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

export const removeAuthData = () => {
  localStorage.removeItem(AUTH_DATA);
}

export const requestBackend = (config: AxiosRequestConfig) => {

  const headers = config.withCredentials ? {
    Authorization: 'Bearer ' + getAuthData().access_token
  } : config.headers;

  console.log('headers', headers);

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

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log("INTERCEPTOR ANTES DA REQUEST");
  return config;
}, function (error) {
  // Do something with request error
  console.log("INTERCEPTOR DE ERRO NA REQUEST");
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log("INTERCEPTOR DE SUCESSO NA RESPONSE");
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log("INTERCEPTOR DE ERRO NA RESPONSE");
  if(error.response.status === 401 || error.response.status === 403) {
    console.log('Erro de validação');
    //redirect('/auth');
  }
  return Promise.reject(error);
});

export const getTokenData = (): TokenData | undefined => {

  const loginResponse = getAuthData();
  try {
    return jwtDecode(loginResponse.access_token) as TokenData;
  }
  catch(error) {
    return undefined;
  }
}

export const isAuthenticated = (): boolean => {
  const tokenData = getTokenData();
  return tokenData !== undefined && (tokenData.exp > (Date.now()/1000));
}

export const isWorkerOrAdmin = (): boolean => {
  const tokenData = getTokenData();
  return tokenData !== undefined && (tokenData.exp > (Date.now()/1000))
      && ( tokenData.authorities.includes('ROLE_WORKER') || tokenData.authorities.includes('ROLE_ADMIN'));
}
