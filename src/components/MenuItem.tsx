import React, { useState } from 'react';
import { useMenu, Item } from '../shared/hooks/menu-hook';

const MenuItem = () => {
  const [ID, setID] = useState<number | null>(null);
  const { menu } = useMenu();

  //onClick of menu item, displays menu item description
  const itemHandler = (item: Item) => {
    if (ID === null || ID !== item._id) {
      setID(item._id);
    } else {
      setID(null);
    }
  };

  //maps menu items when loaded, otherwise return a loading spinner
  return (
    <ul className="items">
      {menu.length ? (
        menu.map((item: Item) => {
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
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </ul>
  );
};

export default MenuItem;
