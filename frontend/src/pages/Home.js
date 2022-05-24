import Deals from '../components/Deals';

import './Home.css';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <div className="deals-card">
        <Deals />
        {/* careers "Work for us" */}
      </div>
    </>
  );
};

export default Home;
