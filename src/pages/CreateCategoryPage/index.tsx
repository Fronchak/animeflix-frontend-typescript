import { AxiosRequestConfig } from 'axios';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from "../../components/CategoryForm";
import { Category } from '../../types/domain/Category';
import { requestAllCategoryNames, requestBackend } from '../../util/request';

export const action = async({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    const config: AxiosRequestConfig = {
      method: 'post',
      url: '/categories',
      data
    }

    const response = await requestBackend(config);
    const category = response.data as Category;
    toast.success('Category created with success');
    return redirect(`/admin/categories/${category.id}`);

  }
  catch(e) {
    toast.error('Error!');
    return redirect('/admin/categories');
  }

}

const CreateCategoryPage = () => {
  return (
    <div className="mt-2">
      <CategoryForm />
    </div>
  );
}

export default CreateCategoryPage;
