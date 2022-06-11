import Deals from '../components/Deals';
import Join from '../components/Join';

import './Home.css';

const Home = () => {
  return (
    <>
      <div className="deals-container">
        <Deals />
      </div>
      <hr />
      <Join />
    </>
  );
};

export default Home;
