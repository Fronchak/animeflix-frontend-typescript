import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { hasAnyRole, isAuthenticated } from '../../util/auth';


const AdminPrivateRoute = () => {
  const location = useLocation();

  if(!isAuthenticated()) {
    return <Navigate to="/auth" state={{
      from: location.pathname
    }} />
  }
  if(!hasAnyRole(['ROLE_ADMIN'])) {
    toast.info(`You don't have permission to access the page`);
    return <Navigate to="/admin" replace={true} />
  }
  return <Outlet />
}

export default AdminPrivateRoute;
