import React from 'react';
import { NavLinks } from './Navigation/NavLinks';
import { Title } from './Title';

import '../../styles/elements/_header.scss';

export const MainHeader = () => {
  return (
    <header className="header">
      <Title />
      <nav className="menu-bar">
        <NavLinks />
      </nav>
    </header>
  );
};
