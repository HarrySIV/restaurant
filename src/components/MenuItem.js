import { useState } from 'react';

const items = [
  {
    name: 'Pizza',
    description: 'Cheese, bread, red sauce',
    price: '4.99',
    key: 0,
  },
  {
    name: 'Spaghetti',
    description: 'cooked noodles, red sauce, parmesan',
    price: '3.99',
    key: 1,
  },
  { name: 'Soda', description: 'pepsi products', price: '4.99', key: 2 },
  {
    name: 'Breadsticks',
    description: 'Fresh bread topped with melted butter',
    price: '5.99',
    key: 3,
  },
];

const MenuItem = () => {
  const [ID, setID] = useState(null);

  const itemHandler = (item) => {
    if (ID === null || ID !== item.key) {
      setID(item.key);
    } else {
      setID(null);
    }
  };

  return (
    <ul className="items">
      {items.map((item) => {
        return (
          <li key={item.key} className="list-item">
            <button className="menu-item" onClick={() => itemHandler(item)}>
              {`${item.name} $${item.price}`}
            </button>
            <h4
              className={`menu-description ${
                ID === item.key ? 'active-item' : 'none'
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

export default MenuItem;
