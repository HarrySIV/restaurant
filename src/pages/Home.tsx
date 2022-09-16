import React from 'react';
import { Deals } from '../components/Deals';
import { Join } from '../components/Join';

import './_home.scss';

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
