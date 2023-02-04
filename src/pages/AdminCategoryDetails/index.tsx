import { AxiosRequestConfig } from "axios";
import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Category } from "../../types/domain/Category";
import { requestBackend } from "../../util/request";
import './styles.css';

export const loader = async({ params }: LoaderFunctionArgs) => {
  const config: AxiosRequestConfig = {
    url: `/categories/${ params.id }`,
    method: 'get',
    withCredentials: true
  }
  const response = await requestBackend(config);
  const category = response.data;
  return { category };
}

type Loader = {
  category: Category
}

const AdminCategoryDetails = () => {

  const {category} = useLoaderData() as Loader;

  return (
    <div className="col-12 p-3 card mt-3" id="admin-category-details-container">
      <h1>{ category.name }</h1>
      <p>{ category.description }</p>
      <hr></hr>
      <div id="category-buttons-container">
        <Link to={`/admin/categories/edit/${ category.id }`} className="btn btn-primary">Edit</Link>
        <Link to={`/admin/categories/delete/${ category.id }`} className="btn btn-danger">Delete</Link>
      </div>
    </div>
  );
}

export default AdminCategoryDetails;
