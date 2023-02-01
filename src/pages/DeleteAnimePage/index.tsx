import { AxiosRequestConfig } from 'axios';
import { LoaderFunctionArgs, ActionFunctionArgs, useLoaderData, Form, redirect } from 'react-router-dom';
import AnimeDetails from '../../components/AnimeDetails';
import { Anime } from '../../types/domain/Anime';
import { requestBackend } from '../../util/request';

export const action = async ({ params }: ActionFunctionArgs) => {
  const config: AxiosRequestConfig = {
    method: 'delete',
    url: `/animes/${params.id}`
  }
  await requestBackend(config);
  return redirect('/admin/animes');
}

export const loader = async({ params }: LoaderFunctionArgs) => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `/animes/${params.id}`
  }
  const response = await requestBackend(config);
  const anime = response.data;
  return { anime };
}

type Loader = {
  anime: Anime;
}

const DeleteAnimePage = () => {

  const { anime } = useLoaderData() as Loader;

  return (
    <div className="p-3">
      <AnimeDetails anime={anime} />
      <Form method='post' className="my-3">
        <button type='submit' className="btn btn-danger">Confirm Delete</button>
      </Form>
    </div>
  );
}

export default DeleteAnimePage;
