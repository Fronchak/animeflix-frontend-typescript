import { Outlet, NavLink } from 'react-router-dom';
import { hasAnyRole } from '../../util/auth';

import './styles.css';

const AdminRoot = () => {

  return (
    <div className="container-xl">
      <div className="row">
        <div className="col-12 col-lg-2 py-3 p-lg-0" id="admin-links-container">
          <NavLink to="animes">Animes</NavLink>
          <NavLink to="categories">Categories</NavLink>
          { hasAnyRole(['ROLE_ADMIN']) && <NavLink to="users">Users</NavLink> }
        </div>
        <div className="col-12 col-lg-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminRoot;
