import { AxiosRequestConfig } from 'axios';
import { ActionFunctionArgs, redirect, useActionData, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from "../../components/CategoryForm";
import { Category } from '../../types/domain/Category';
import { DefaultDataError } from '../../types/vendor/DefaultDataError';
import { RequestError } from '../../types/vendor/RequestError';
import { requestAllCategoryNames, requestBackend } from '../../util/request';

export const action = async({ request, params }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const config: AxiosRequestConfig = {
      method: 'put',
      url: `/categories/${ params.id }`,
      data
    }

    const response = await requestBackend(config);
    const category = response.data as Category;
    toast.success('Category updated with success');
    return redirect(`/admin/categories/${category.id}`);
  }
  catch(e) {
    toast.error('Error when try to update category!');
    const obj = e as RequestError;
    return obj.response.data;
  }

}

export const loader = async({ params }: LoaderFunctionArgs) => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `/categories/${ params.id }`
  }
  const response = await requestBackend(config);
  const category = response.data;
  return { category };
}

type Loader = {
  category: Category;
}

const UpdateCategoryPage = () => {

  const { category } = useLoaderData() as Loader;
  const actionData = useActionData() as DefaultDataError;
  return (
    <div className="mt-2">
      <CategoryForm serverError={actionData} defaultValues={ category } />
    </div>
  );
}

export default UpdateCategoryPage;
