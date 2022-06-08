import Deals from '../components/Deals';
import Join from '../components/Join';

import './Home.css';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <div className="deals-card">
        <Deals />
        {/* careers "Work for us" */}
      </div>
      <hr />
      <Join />
    </>
  );
};

export default Home;
