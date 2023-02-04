import { AxiosRequestConfig } from 'axios';
import { ActionFunctionArgs, redirect, useActionData } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from "../../components/CategoryForm";
import { Category } from '../../types/domain/Category';
import { DefaultDataError } from '../../types/vendor/DefaultDataError';
import { RequestError } from '../../types/vendor/RequestError';
import { requestBackend } from '../../util/request';

export const action = async({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const config: AxiosRequestConfig = {
      method: 'post',
      url: '/categories',
      withCredentials: true,
      data
    }

    const response = await requestBackend(config);
    const category = response.data as Category;
    toast.success('Category created with success');
    return redirect(`/admin/categories/${category.id}`);
  }
  catch(e) {
    toast.error('Error when try to create category!');
    const obj = e as RequestError;
    return obj.response.data;
  }

}

const CreateCategoryPage = () => {
  const actionData = useActionData() as DefaultDataError;
  return (
    <div className="mt-2">
      <CategoryForm serverError={actionData} />
    </div>
  );
}

export default CreateCategoryPage;
