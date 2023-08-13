import { useState } from 'react';
import { Button } from '../shared/elements/formElements/Button';
import { useMenu, IMenuItem } from '../shared/hooks/database/menu-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddToOrder } from './AddMenuItemToOrder';
import { LoadingSpinner } from '../shared/elements/uiElements/LoadingSpinner';

export const MenuItem = () => {
  const { menu } = useMenu();
  const [ID, setID] = useState<string>();
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);
  const [initialValue, setInitialValue] = useState<string>();

  //onClick of menu item, displays menu item description
  const descriptionHandler = (menuItem: IMenuItem) => {
    if (ID === null || ID !== menuItem._id) {
      setID(menuItem._id);
    } else {
      setID('');
    }
  };

  const addHandler = (menuItem: IMenuItem) => {
    setMenuItem(menuItem);
    const selection = menuItem.sizes?.length
      ? menuItem.sizes
      : menuItem.flavors?.length
      ? menuItem.flavors
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
    setMenuItem(null);
  };

  //displays menu items when menu and menu.length exist... breaks otherwise.
  return (
    <>
      {!menu.length ? (
        <LoadingSpinner />
      ) : (
        <ul className="items">
          {menu.length &&
            menu.map((menuItem: IMenuItem) => {
              return (
                <li key={menuItem._id} className="list-item">
                  <div className="li-inner">
                    <button
                      className="menu-item"
                      onClick={() => descriptionHandler(menuItem)}
                    >
                      {menuItem.name}
                    </button>
                    <Button
                      text={<FontAwesomeIcon icon={faPlus} />}
                      onClick={() => addHandler(menuItem)}
                    />
                  </div>
                  <h4
                    className={`menu-description ${
                      ID === menuItem._id ? 'active-item' : 'none'
                    }`}
                  >
                    {menuItem.description}
                  </h4>
                </li>
              );
            })}
        </ul>
      )}

      {openOrder && menuItem && initialValue && (
        <AddToOrder
          menuItem={menuItem}
          setMenuItem={setMenuItem}
          initialValue={initialValue}
          closeHandler={closeHandler}
        />
      )}
    </>
  );
};
