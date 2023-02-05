import { Outlet, useLoaderData } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { getTokenData, isAuthenticated, TokenData } from '../../util/auth';

export const loader = (): Loader => {
  if(isAuthenticated()) {
    return {
      authenticated: true,
      tokenData: getTokenData()
    };
  }
  else {
    return {
      authenticated: false
    }
  }
}

type Loader = {
  authenticated: boolean;
  tokenData?: TokenData;
}

const Root = () => {

  const { authenticated, tokenData } = useLoaderData() as Loader;

  return (
    <>
      <Navbar authenticated={ authenticated } tokenData={ tokenData } />
      <Outlet />
    </>
  );
}

export default Root;
