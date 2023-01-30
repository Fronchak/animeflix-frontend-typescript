import { AxiosRequestConfig } from "axios";
import { useLoaderData } from 'react-router-dom';
import { requestBackend } from "../../util/request";
import { User } from "../../types/domain/User";


export const loader = async () => {
  const config: AxiosRequestConfig = {
    url: '/users/1',
    withCredentials: true
  }

  const response = await requestBackend(config);
  console.log('status:', response.status);
  const user = response.data;
  return { user };
}

type Loader = {
  user: User;
}

const UserPage = () => {
  const { user } = useLoaderData() as Loader;

  return (
    <div className="container">
      <h1>User Details</h1>
      <h2>{ user.email }</h2>
      <p>{ user.id }</p>
    </div>
  );
}

export default UserPage;
