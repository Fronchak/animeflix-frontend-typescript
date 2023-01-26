import { Link, useLoaderData, redirect } from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';
import AnimeCard from "../../components/AnimeCard";
import { BASE_URL } from '../../util/request';
import { SpringPage } from '../../types/vendor/StringPage';

type Anime = {
  id: number,
  name: string;
  imgUrl: string;
  avaliation: number;
}

export const loader = async () => {
  try {
    const config: AxiosRequestConfig = {
      baseURL: BASE_URL,
      method: "get",
      url: '/animes',
      params: {
        size: 12,
        page: 0
      }
    }
    const response = await axios(config);
    const page = response.data;
    return { page };
  }
  catch(e) {
    console.log(e);
    return redirect('/')
  }
}

type LoaderData = {
  page: SpringPage<Anime>
}

const Animes = () => {

  const { page } = useLoaderData() as LoaderData;
  const animes = page.content;

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

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-12">
          <h1>Animes</h1>
        </div>
        { content() }
      </div>
    </div>
  );
}

export default Animes;
