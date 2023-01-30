import { Link, useLoaderData, redirect, LoaderFunctionArgs, useNavigate } from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';
import AnimeCard from "../../components/AnimeCard";
import { getParamsToAnimePageFromRequest, requestAllCategoryNames, requestBackend } from '../../util/request';
import { SpringPage } from '../../types/vendor/StringPage';
import AnimeFilter from '../../components/AnimeFilter';
import { CategoryName } from '../../types/domain/CategoryName';
import { AnimeFilterData } from '../../types/domain/AnimeFilterData';
import { useEffect } from 'react';
import Pagination from '../../components/Pagination';

type Anime = {
  id: number,
  name: string;
  imgUrl: string;
  avaliation: number;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {

  const params = getParamsToAnimePageFromRequest(request);

  try {
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
  catch(e) {
    console.log(e);
    return redirect('/')
  }
}

type LoaderData = {
  page: SpringPage<Anime>
  categories: CategoryName[];
  params: AnimeFilterData;
}

const Animes = () => {

  const { page, categories, params } = useLoaderData() as LoaderData;
  const animes = page.content;
  const navigate = useNavigate();

  useEffect(() => {
    const input = document.getElementById('filter') as HTMLInputElement;
    input.value = params.filter
    const select = document.getElementById('categoryId') as HTMLSelectElement;
    select.value = String(params.categoryId);
  }, [params]);

  const content = () =>{
    return animes.map((anime) => {
      return (
        <Link to={anime.id + ''} className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3" key={anime.id}>
          <div>
            <AnimeCard anime={anime} />
          </div>
        </Link>
      );
    });
  }

  const onPageChange = (page: number) => {
    navigate(`/animes?page=${page}&filter=${params.filter}&categoryId=${params.categoryId}`);
  }

  return (
    <>
      <div className="container py-3">
        <div className="row">
          <div className="col-12">
            <h1>Animes</h1>
          </div>
          <div className="col-12">
            <AnimeFilter categories={ categories } defaultValues={ params } handleClearFilter={() => navigate('/animes')} />
          </div>
          { content() }
        </div>
      </div>
      <div className="col-12 mt-3">
        <Pagination activePage={page.number} pageCount={page.totalPages} onPageChange={onPageChange} />
      </div>
    </>
  );
}

export default Animes;
