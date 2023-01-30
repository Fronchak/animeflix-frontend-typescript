import { Link } from 'react-router-dom';
import HomeBanner from '../../assets/imgs/home-banner.jpg';
import './styles.css';

const Home = () => {
  return (
    <div className='text-center' id="home-container">
      <img src={ HomeBanner } alt="Home banner" className="img-fluid mb-4 w-100" />
      <p><Link to={"animes"}>Click here</Link> to see the best animes</p>
    </div>
  );
}

export default Home;
