import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">HOME</NavLink>
      </li>
      <li>
        <NavLink to="/menu">MENU</NavLink>
      </li>
      <li>
        <NavLink to="/about">ABOUT</NavLink>
      </li>
      <li>
        <NavLink to="/locations">LOCATIONS</NavLink>
      </li>
      <li>
        <NavLink to="/checkout">
          <i class="fa-solid fa-cash-register"></i>
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
