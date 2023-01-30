type Props = {
  value: number;
}

const Star = ({ value }: Props) => {
  if(value >= 1) {
    return <i className="bi bi-star-fill text-warning"></i>
  }
  if (value >= 0.5) {
    return <i className="bi bi-star-half text-warning"></i>
  }
  return <i className="bi bi-star text-warning"></i>
}

export default Star;

