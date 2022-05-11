import NavLinks from '../Navigation/NavLinks';
import Title from './Title';

const MainHeader = (props) => {
  return (
    <header>
      <Title />
      <nav>
        <NavLinks />
      </nav>
    </header>
  );
};

export default MainHeader;
