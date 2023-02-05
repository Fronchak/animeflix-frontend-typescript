import jwtDecode from "jwt-decode";
import { getAuthData } from "./storage";

type Role = 'ROLE_WORKER' | 'ROLE_ADMIN' | 'ROLE_USER';

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
}

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

export const hasAnyRole = (roles: Role[]): boolean => {
  if(roles.length === 0) return true;

  const tokenData = getTokenData();

  if(tokenData === undefined) return false;

  for(let i = 0; i < roles.length; i++) {
    if(tokenData.authorities.includes(roles[i])) return true;
  }

  return false;
}
