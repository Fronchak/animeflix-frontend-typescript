import { Anime } from "../../types/domain/Anime";
import AnimeNota from "../AnimeNota";

type Props = {
  anime: Anime
}

const AnimeDetails = ({ anime }: Props) => {
  return (
    <div className="card">
      <img src={ anime.imgUrl } alt={ anime.synopsis } className="card-img-top" />
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-6">
            <h3 className="card-title">{ anime.name }</h3>
            <p className="card-text">Ano de lançamento: { anime.lauchYear }</p>
            <AnimeNota avaliation={ anime.avaliation } />
          </div>
          <div className="col-12 col-md-6">
            <h5>Synopsis</h5>
            <p className="card-text">{ anime.synopsis }</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetails;
