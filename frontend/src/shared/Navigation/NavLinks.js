import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <ul className="navLinks">
      <li>
        <NavLink to="/">
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/menu">
          MENU
        </NavLink>
      </li>
      <li>
        <NavLink to="/about">ABOUT</NavLink>
      </li>
      <li>
        <NavLink to="/locations">
          LOCATIONS
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
