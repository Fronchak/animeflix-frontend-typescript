import { useEffect, useState } from "react";
import ErrorComponent from "../../components/ErrorComponent";
import Navbar from "../../components/Navbar";
import { getTokenData, isAuthenticated, TokenData } from "../../util/auth";

type AuthData = {
  authenticated: boolean;
  tokenData?: TokenData;
}

const ErrorPage = () => {

  console.log('catch by ERROR PAGE!');
  const [authData, setAuthData] = useState<AuthData>({
    authenticated: false
  });

  useEffect(() => {
    if(isAuthenticated()) {
      setAuthData({
        authenticated: true,
        tokenData: getTokenData()
      });
    }
    else {
      setAuthData({
        authenticated: false
      })
    }
  }, [])

  return (
    <>
      <Navbar authenticated={authData.authenticated} tokenData={authData.tokenData} />
      <ErrorComponent />
    </>
  )
}

export default ErrorPage;
