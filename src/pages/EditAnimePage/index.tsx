import { AxiosRequestConfig } from 'axios';
import { useLoaderData, ActionFunctionArgs, redirect, useActionData, LoaderFunctionArgs } from 'react-router-dom';
import AnimeForm from "../../components/AnimeForm";
import { Anime } from '../../types/domain/Anime';
import { CategoryName } from '../../types/domain/CategoryName';
import { DefaultDataError } from '../../types/vendor/DefaultDataError';
import { RequestError } from '../../types/vendor/RequestError';
import { requestAllCategoryNames, requestBackend } from '../../util/request';

export const action = async({ request, params }: ActionFunctionArgs) => {
try {
  const formData = await request.formData();
  console.log('formData', formData);
  const categories = formData.getAll('categories');
  const obj = Object.fromEntries(formData);
  const data = { ...obj, categories };
  console.log('data', data);
  const config: AxiosRequestConfig = {
    method: 'put',
    url: `/animes/${params.id}`,
    data
  }
  const response = await requestBackend(config);
  return redirect(`/animes/${(response.data as Anime).id}`);
}
catch(e) {
  const obj = e as RequestError;
  return obj.response.data;
}

}

export const loader = async({ params }: LoaderFunctionArgs) => {
  const categories = await requestAllCategoryNames();
  const config: AxiosRequestConfig = {
    url: `/animes/${params.id}`,
    method: 'get'
  }
  const response = await requestBackend(config);
  const anime = response.data;
  return { categories, anime };
}

type Loader = {
  categories: CategoryName[]
  anime: Anime;
}

const EditAnimePage = () => {

  const { categories, anime } = useLoaderData() as Loader;
  const actionData = useActionData() as DefaultDataError;

  return (
    <div className="m-2 p-2">
      <AnimeForm categories={ categories } serverError={actionData} defaultValues={anime} />
    </div>
  );
}

export default EditAnimePage;
