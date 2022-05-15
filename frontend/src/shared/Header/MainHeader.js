import NavLinks from '../Navigation/NavLinks';
import Title from './Title';

import './Header.css';

const MainHeader = (props) => {
  return (
    <header>
      <Title />
      <nav className="menu-bar">
        <NavLinks />
      </nav>
    </header>
  );
};

export default MainHeader;
