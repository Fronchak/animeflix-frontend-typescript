import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate, useLoaderData, useParams, LoaderFunctionArgs, redirect } from 'react-router-dom';
import AnimeDetails from '../../components/AnimeDetails';
import { Anime } from '../../types/domain/Anime';
import { requestBackend } from '../../util/request';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `/animes/${ params.id }`,
    withCredentials: true
  }

    const response = await requestBackend(config);
    const anime = response.data;
    return { anime }

}

type LoaderData = {
  anime: Anime
};

const AnimeDetailsPage = () => {

  const navigate = useNavigate();
  const { anime } = useLoaderData() as LoaderData;


  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-12 mb-4">
          <button type="button" onClick={() => navigate(-1)} className="btn btn-primary">
            {"<- VOLTAR"}
          </button>
        </div>
        <div className="col-12">
          <AnimeDetails anime={ anime } />
        </div>
        <div className="col-12">
          RODAPÉ
        </div>
      </div>
    </div>
  );
}

export default AnimeDetailsPage;
