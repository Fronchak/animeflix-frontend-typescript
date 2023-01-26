import { formatNota } from "../../util/format";

type Props = {
  avaliation: number;
}

const AnimeNota = ({ avaliation }: Props) => {
  return <p className="card-text">Nota: { formatNota(avaliation) }/{ formatNota(10) }</p>
}

export default AnimeNota;
