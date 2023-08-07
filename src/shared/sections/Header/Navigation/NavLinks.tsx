import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useOrderContext } from '../../../hooks/orderContext/OrderContext';

export const NavLinks = () => {
  const orderContext = useOrderContext();
  const { items } = orderContext;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(0);
    items.forEach((item) => {
      if (!item || !item.quantity) return;
      setTotal((total) => total + item?.quantity);
    });
  }, [items]);

  return (
    <ul className="nav-links">
      <li className="nav-li">
        <NavLink to="/">HOME</NavLink>
      </li>
      <li className="nav-li">
        <NavLink to="/menu">MENU</NavLink>
      </li>
      <li className="nav-li">
        <NavLink to="/about">ABOUT</NavLink>
      </li>
      <li className="nav-li">
        <NavLink to="/locations">LOCATIONS</NavLink>
      </li>
      <li className="nav-li">
        <NavLink to="/order">
          <div className="checkout">
            <FontAwesomeIcon icon={faCircle} className="circle" color="green" />
            <h6 className="number">{total}</h6>
            <FontAwesomeIcon icon={faCashRegister} className="register" />
          </div>
        </NavLink>
      </li>
    </ul>
  );
};
