import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated, isWorkerOrAdmin } from '../../util/request';

const PrivateRoute = () => {
  return (isWorkerOrAdmin() ? <Outlet /> : <Navigate to="/auth" />)
}

export default PrivateRoute;
