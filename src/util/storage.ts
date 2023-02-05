const AUTH_DATA = 'authData';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
};

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
