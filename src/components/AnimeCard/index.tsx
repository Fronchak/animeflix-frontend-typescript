import { formatNota } from "../../util/format";
import AnimeNota from "../AnimeNota";

type Props = {
  anime: {
    name: string;
    imgUrl: string;
    avaliation: number;
  }
}

const AnimeCard = ( {anime} : Props ) => {
  return (
    <div className="card">
      <img src={ anime.imgUrl } className="card-img-top"/>
      <div className="card-body">
        <h5 className="card-title">{ anime.name }</h5>
        <AnimeNota avaliation={ anime.avaliation } />
      </div>
    </div>
  );
}

export default AnimeCard;
