import { NavLink } from 'react-router-dom';

import './Footer.css';

const SiteMap = () => {
  return (
    <footer>
      <hr />
      <div className="site-map">
        <ul className="column">
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
        </ul>
        <ul className="column">
          <li>
            <NavLink to="/careers">Careers</NavLink>
          </li>
        </ul>
      </div>
        <h6 className="author">Created by Harry Sanders</h6>
    </footer>
  );
};

export default SiteMap;
