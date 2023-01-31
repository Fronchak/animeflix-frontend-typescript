import { useRouteError } from 'react-router-dom';

type RouteError = {
  statusText: string;
  message: string;
}

const ErrorComponent = () => {
  const error = useRouteError() as RouteError;
  console.log(error);
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
