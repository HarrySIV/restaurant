import { useState } from 'react';

const items = [
  {
    name: 'Pizza',
    description: 'Cheese, bread, red sauce',
    price: '4.99',
    key: 1,
  },
  {
    name: 'Spaghetti',
    description: 'cooked noodles, red sauce, parmesan',
    price: '3.99',
    key: 2,
  },
  { name: 'Soda', description: 'pepsi products', price: '4.99', key: 3 },
];

const styles = {
  display: 'active-item',
};

const MenuItem = () => {
  const [] = useState(false);

  const itemHandler = () => {
    styles.display === 'active-item'
      ? (styles.display = 'none')
      : (styles.display = 'active-item');
  };

  return (
    <li className="items">
      {items.map((item) => {
        return (
          <ul>
            <button className="menu-item" onClick={itemHandler} key={item.name}>
              {`${item.name}          ${item.price}`}
            </button>
            <h4
              className={`menu-description ${
                styles.display === 'active-item'
                  ? (styles.display = 'none')
                  : (styles.display = 'active-item')
              }`}
              key={item.key}
            >
              {item.description}
            </h4>
          </ul>
        );
      })}
    </li>
  );
};

export default MenuItem;
