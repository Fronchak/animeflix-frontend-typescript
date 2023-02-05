import { Navigate } from 'react-router-dom';
import { removeAuthData } from '../../util/storage';

export const loader = () => {
  removeAuthData();
  return null;
}

const Logout = () => {
  return <Navigate to={'/'} />
}

export default Logout;
