import { NavLink } from 'react-router-dom';
import { hasAnyRole, TokenData } from '../../util/auth';
import './styles.css';

type Props = {
  authenticated: boolean;
  tokenData?: TokenData;
}

const Navbar = ({ authenticated, tokenData }: Props) => {

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Anime Flix</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarItems" aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarItems">
          <ul className="navbar-nav mb-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="animes">Animes</NavLink>
            </li>
            { hasAnyRole(['ROLE_ADMIN', 'ROLE_WORKER']) && (
              <li className="nav-item">
                <NavLink className="nav-link" to="admin">Admin</NavLink>
              </li>
            ) }
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            { authenticated && (
              <li className="nav-item">
                <span className="nav-link text-white">{ tokenData?.user_name }</span>
              </li>
            ) }

            <li className="nav-item">
              { authenticated ? (
                <>
                  <NavLink className="nav-link" to="logout">Logout</NavLink>
                </>
              ) : (
                <NavLink className="nav-link" to="auth">Login</NavLink>
              ) }

            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
