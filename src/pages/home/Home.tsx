import React from 'react';
import { Deals } from './Deals';
import { Join } from './Join';

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
