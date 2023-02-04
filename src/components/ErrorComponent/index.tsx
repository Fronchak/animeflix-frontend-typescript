import { useEffect } from 'react';
import { redirect, useNavigate, useRouteError } from 'react-router-dom';

type RouteError = {
  statusText: string;
  message: string;
}

const ErrorComponent = () => {
  const error = useRouteError() as any;
  const navigate = useNavigate();
  /*
  if((e as any).response.status === 401 || (e as any).response.status === 403) {
    console.log('401 ou 403');
    return redirect('/auth');
  }
  */

  useEffect(() => {
    if(error.response.status === 401 || error.response.status === 403) {
      console.log('401 ou 403');
      navigate('/auth');
    }
    else if(error.response.status === 422) {
      navigate(-1);
    }
  }, []);

  console.log(error.response);
//navigate('/auth');
  return (
    <div className="container text-center p-2 p-lg-5">
      <h1 className="mb-4">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorComponent;
