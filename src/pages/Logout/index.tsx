import { Navigate, redirect } from 'react-router-dom';
import { removeAuthData } from '../../util/request';

export const loader = () => {
  removeAuthData();
  return null;
}

const Logout = () => {
  return <Navigate to={'/'} />
}

export default Logout;
