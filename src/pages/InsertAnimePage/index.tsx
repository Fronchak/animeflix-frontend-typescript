import { AxiosError, AxiosRequestConfig } from 'axios';
import { useLoaderData, ActionFunctionArgs, redirect, useActionData } from 'react-router-dom';
import AnimeForm from "../../components/AnimeForm";
import { Anime } from '../../types/domain/Anime';
import { CategoryName } from '../../types/domain/CategoryName';
import { DefaultDataError } from '../../types/vendor/DefaultDataError';
import { RequestError } from '../../types/vendor/RequestError';
import { requestAllCategoryNames, requestBackend } from '../../util/request';

export const action = async({ request }: ActionFunctionArgs) => {
try {
  const formData = await request.formData();
  const categories = formData.getAll('categories');
  const obj = Object.fromEntries(formData);
  const data = { ...obj, categories: [1, 2, 20] };
  const config: AxiosRequestConfig = {
    method: 'post',
    url: '/animes',
    data
  }
  const response = await requestBackend(config);
  return redirect(`/animes/${(response.data as Anime).id}`);
}
catch(e) {
  console.log(e);
  const obj = e as RequestError;
  return obj.response.data;
}

}

export const loader = async() => {
  const categories = await requestAllCategoryNames();
  //throw new Error('Error at InsertAnimePage')
  return { categories };
}

type Loader = {
  categories: CategoryName[];
}

const InsertAnimePage = () => {

  const { categories } = useLoaderData() as Loader;
  const actionData = useActionData() as DefaultDataError;
  console.log('INSIDE INSERT ANIME PAGE');
  console.log(actionData);

  return (
    <div className="m-2 p-2">
      <AnimeForm categories={ categories } serverError={actionData} />
    </div>
  );
}

export default InsertAnimePage;
