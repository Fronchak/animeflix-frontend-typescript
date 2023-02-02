import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { Link, useLoaderData, ActionFunctionArgs, useNavigate } from 'react-router-dom';
import CategoryFilter from "../../components/CategoryFilter";
import { Category } from "../../types/domain/Category";
import { requestBackend } from "../../util/request";
import './styles.css';

export const loader = async({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const filter = url.searchParams.get("filter") || "";
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `/categories?filter=${ filter }`
  }
  const response = await requestBackend(config);
  const categories = response.data;
  return { categories, filter };
}

type Loader = {
  categories: Category[],
  filter: string
}

const AdminCategoriesList = () => {

  const { categories, filter } = useLoaderData() as Loader;
  const navigate = useNavigate();

  useEffect(() => {
    const input = document.getElementById('filter') as HTMLInputElement;
    input.value = filter
  }, [filter]);

  return (
    <div className="container-lg my-lg-3 m-xl-4 card" id="admin-categories-list-container">
      <div className="row my-4 align-items-center">
        <div className="col-12 col-md-2 mb-3 mb-md-0">
          <Link to="create" className="btn btn-primary w-100">Add</Link>
        </div>
        <div className="col-12 col-md-10">
          <CategoryFilter filter={ filter } onClearFilter={() => navigate('/admin/categories')} />
        </div>
      </div>
      <div className="row">
        { categories.map((category) => (
        <div key={category.id} className="col-12 mb-1">
          <Link to={String(category.id)}>
            <div className="alert alert-dark py-2" role="alert">
              { category.name }
            </div>
          </Link>
        </div>
        )) }
      </div>
    </div>
  );
}

export default AdminCategoriesList;
