import React from 'react';
import Deals from '../components/Deals';
import Join from '../components/Join';

import '../styles/pages/_home.scss';

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
