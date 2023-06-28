import { useState } from 'react';
import { Button } from '../shared/elements/formElements/Button';
import { useMenu, IMenuItem } from '../shared/hooks/database/menu-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddToOrder } from './AddToOrder';
import { LoadingSpinner } from '../shared/elements/uiElements/LoadingSpinner';

export const MenuItem = () => {
  const { menu } = useMenu();
  const [ID, setID] = useState<string>();
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [item, setItem] = useState<IMenuItem | null>(null);
  const [initialValue, setInitialValue] = useState<string>();

  //onClick of menu item, displays menu item description
  const descriptionHandler = (item: IMenuItem) => {
    if (ID === null || ID !== item._id) {
      setID(item._id);
    } else {
      setID('');
    }
  };

  const addHandler = (item: IMenuItem) => {
    setItem(item);
    const selection = item.sizes?.length
      ? item.sizes
      : item.flavors?.length
      ? item.flavors
      : null;
    if (selection?.length)
      setInitialValue(
        selection.find((selectionValue) => selectionValue.checked === true)!
          .value
      );
    setOpenOrder(true);
  };

  const closeHandler = () => {
    setOpenOrder(false);
    setItem(null);
  };

  //displays menu items when menu and menu.length exist... breaks otherwise.
  return (
    <>
      {!menu.length ? (
        <LoadingSpinner />
      ) : (
        <ul className="items">
          {menu.length &&
            menu.map((item: IMenuItem) => {
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

      {openOrder && item && initialValue && (
        <AddToOrder
          item={item}
          initialValue={initialValue}
          closeHandler={closeHandler}
        />
      )}
    </>
  );
};
