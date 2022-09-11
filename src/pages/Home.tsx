import React from 'react';
import { Deals } from '../components/Deals';
import { Join } from '../components/Join';

import '../styles/pages/_home.scss';

export const Home = () => {
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
