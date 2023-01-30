import Star from "../Star";
import './styles.css';

type Props = {
  value: number;
}

const Stars = ({ value }: Props) => {
  return (
    <div id="stars-container">
      <Star value={value} />
      <Star value={value - 1} />
      <Star value={value - 2} />
      <Star value={value - 3} />
      <Star value={value - 4} />
    </div>
  );
}

export default Stars;

