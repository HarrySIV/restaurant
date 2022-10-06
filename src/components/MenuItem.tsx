import React, { useState } from 'react';
import { useMenu, IMenuItem } from '../shared/hooks/database/menu-hook';

export const MenuItem = () => {
  const [ID, setID] = useState<string>();
  const { menu } = useMenu();

  //onClick of menu item, displays menu item description
  const itemHandler = (item: IMenuItem) => {
    if (ID === null || ID !== item._id) {
      setID(item._id);
    } else {
      setID('');
    }
  };

  //displays menu items when menu and menu.length exist... breaks otherwise.
  return (
    <ul className="items">
      {menu.length &&
        menu.map((item: IMenuItem) => {
          return (
            <li key={item._id} className="list-item">
              <button className="menu-item" onClick={() => itemHandler(item)}>
                {`${item.name} $${item.price}`}
              </button>
              <h4
                className={`menu-description ${
                  ID === item._id ? 'active-item' : 'none'
                }`}
              >
                {item.description}
              </h4>
            </li>
          );
        })}
    </ul>
  );
};
