import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faCircle } from '@fortawesome/free-solid-svg-icons';

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
          <div className="checkout">
            <FontAwesomeIcon icon={faCircle} className="circle" color="green"  />
            <h6 className="number">0</h6>
            <FontAwesomeIcon icon={faCashRegister} className="register" />
          </div>
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
