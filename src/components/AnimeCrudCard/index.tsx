
import { Link } from 'react-router-dom';
import { Anime } from '../../types/domain/Anime';
import AnimeNota from '../AnimeNota';
import './styles.css';

type Props = {
  anime: Anime;
}

const AnimeCrudCard = ({ anime }: Props) => {
  return (
    <div className="row m-0 pb-2 anime-crud-card-container card">
    <div className="col-12 p-0">
      <img src={ anime.imgUrl } className="img-fluid w-100" />
    </div>
    <div className="col-12 mb-2">
      <h2 className="mb-0">{ anime.name }</h2>
      <AnimeNota avaliation={8} />
    </div>
    <div className="col-12">
      <div className="row">
        <div className="col-6">
          <Link to={`edit/${anime.id}`} className="btn btn-primary w-100">Edit</Link>
        </div>
        <div className="col-6">
          <Link to={`delete/${anime.id}`} className="btn btn-danger w-100">Delete</Link>
        </div>
      </div>
    </div>
  </div>
  );
}

export default AnimeCrudCard;
