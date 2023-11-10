import React from 'react';
import { NavLink } from 'react-router-dom';

export const Join = () => {
  return (
    <h2 className="join">
      Join our team
      <NavLink to="/careers">
        <span className="link"> here!</span>
      </NavLink>
    </h2>
  );
};
