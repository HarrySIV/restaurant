import React from 'react';
import NavLinks from '../Navigation/NavLinks';
import Title from './Title';

import '../../styles/elements/_header.scss';

const MainHeader = (props) => {
  return (
    <header className="header">
      <Title />
      <nav className="menu-bar">
        <NavLinks />
      </nav>
    </header>
  );
};

export default MainHeader;
