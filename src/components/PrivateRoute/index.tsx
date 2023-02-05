import { Outlet, Navigate } from 'react-router-dom';
import { isWorkerOrAdmin } from '../../util/request';

const PrivateRoute = () => {
  return (isWorkerOrAdmin() ? <Outlet /> : <Navigate to="/auth" />)
}

export default PrivateRoute;
