import { Outlet } from "react-router-dom";
import LoginImage from '../../assets/imgs/login.svg';

const Auth = () => {
  return (
    <div className="container my-3 py-3 card-container">
      <div className="row">
        <div className="col-12 col-md-6 order-md-2">
          <Outlet />
        </div>
        <div className="col-12 col-md-6">
          <img src={ LoginImage } alt="Login" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Auth;
