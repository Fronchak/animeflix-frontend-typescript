import { formatNota } from "../../util/format";
import Stars from "../Stars";

type Props = {
  avaliation: number;
}

const AnimeNota = ({ avaliation }: Props) => {
  return (
    <div className="d-flex align-items-center">
      <Stars value={ avaliation/2 } />
      <p className="card-text ms-2"> { formatNota(avaliation) }/{ formatNota(10) }</p>
    </div>
  );
}

export default AnimeNota;
