import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { Link, LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import AnimeCrudCard from "../../components/AnimeCrudCard";
import AnimeFilter from "../../components/AnimeFilter";
import Pagination from "../../components/Pagination";
import { Anime } from "../../types/domain/Anime";
import { AnimeFilterData } from "../../types/domain/AnimeFilterData";
import { CategoryName } from "../../types/domain/CategoryName";
import { SpringPage } from "../../types/vendor/StringPage";
import { getParamsToAnimePageFromRequest, requestAllCategoryNames, requestBackend } from "../../util/request";

export const loader = async ({ request }: LoaderFunctionArgs) => {

  const params = getParamsToAnimePageFromRequest(request);
  const config: AxiosRequestConfig = {
    method: "get",
    url: '/animes',
    params
  }

  const response = await requestBackend(config);
  const page = response.data;
  const categories = await requestAllCategoryNames();
  return { page, categories, params };
}

type LoaderData = {
  page: SpringPage<Anime>
  categories: CategoryName[];
  params: AnimeFilterData;
}

const AdminAnimesList = () => {

  const { page, categories, params } = useLoaderData() as LoaderData;
  const navigate = useNavigate();

  useEffect(() => {
    const input = document.getElementById('filter') as HTMLInputElement;
    input.value = params.filter
    const select = document.getElementById('categoryId') as HTMLSelectElement;
    select.value = String(params.categoryId);
  }, [params]);

  const onPageChange = (page: number) => {
    navigate(`/admin/animes?page=${page}&filter=${params.filter}&categoryId=${params.categoryId}`);
  }

  return (
    <div >
      <div className="row align-items-center mb-4 gx-lg-2 mt-3">
        <div className="col-12 col-md-2 col-lg-1">
          <Link to="create" className="btn btn-primary d-block">ADD</Link>
        </div>
        <div className="col-12 col-md-10 col-lg-11">
          <AnimeFilter categories={categories} handleClearFilter={() => navigate('/admin/animes')} defaultValues={params} />
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 g-2 g-sm-3 g-md-4 row-cols-md-3">
        { page.content.map((anime) => (
          <div className="col" key={anime.id}>
            <AnimeCrudCard anime={anime} />
          </div>
        )) }
      </div>
      <div className="col-12 mt-3">
        <Pagination activePage={page.number} pageCount={page.totalPages} onPageChange={onPageChange} />
      </div>
    </div>
  );
}

export default AdminAnimesList;
