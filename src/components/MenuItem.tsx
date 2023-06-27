import { useState, useEffect } from 'react';
import { Button } from '../shared/elements/formElements/Button';
import { useMenu, IMenuItem } from '../shared/hooks/database/menu-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddToOrder } from './AddToOrder';
import { LoadingSpinner } from '../shared/elements/uiElements/LoadingSpinner';

export const MenuItem = () => {
  const [ID, setID] = useState<string>();
  const { menu } = useMenu();
  const [updatedMenu, setUpdatedMenu] = useState(menu);
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [item, setItem] = useState<IMenuItem[]>([]);

  useEffect(() => {
    const newMenu = menu.map((item) => {
      if (item.options && item.options.length > 0) {
        return {
          ...item,
          options: item.options.map((option) => {
            return { name: option.name, price: option.price, checked: false };
          }),
        };
      }
      if (!item.options) return { ...item, options: [] };
      return item;
    });
    setUpdatedMenu(newMenu);
  }, [menu]);

  //onClick of menu item, displays menu item description
  const descriptionHandler = (item: IMenuItem) => {
    if (ID === null || ID !== item._id) {
      setID(item._id);
    } else {
      setID('');
    }
  };

  const addHandler = (item: IMenuItem) => {
    setItem([item]);
    setOpenOrder(true);
  };

  const closeHandler = () => {
    setOpenOrder(false);
    setItem([]);
  };

  //displays menu items when menu and menu.length exist... breaks otherwise.
  return (
    <>
      {!menu.length ? (
        <LoadingSpinner />
      ) : (
        <ul className="items">
          {updatedMenu.length &&
            updatedMenu.map((item: IMenuItem) => {
              return (
                <li key={item._id} className="list-item">
                  <div className="li-inner">
                    <button
                      className="menu-item"
                      onClick={() => descriptionHandler(item)}
                    >
                      {item.name}
                    </button>
                    <Button
                      text={<FontAwesomeIcon icon={faPlus} />}
                      onClick={() => addHandler(item)}
                    />
                  </div>
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
      )}

      {openOrder && <AddToOrder items={item} closeHandler={closeHandler} />}
    </>
  );
};
