import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { AddMenuItemToOrder } from './AddMenuItemToOrder';

import { Button } from '../../shared/elements/form/Button';
import { useFetch } from '../../shared/hooks/fetch-hook';
import { LoadingSpinner } from '../../shared/elements/ui/LoadingSpinner';

import './_menu.scss';

export interface IMenuItem {
  name: string;
  description: string;
  price: number;
  _id: string;
  cooking_time: string;
  options: TItemOption[];
  sizes?: TSize[];
  flavors?: TFlavor[];
}

export type TItemOption = { name: string; price: number; checked: boolean };

export type TSize = {
  id: string;
  value: string;
  isValid: boolean;
  price: number;
  inches: number;
  checked: boolean;
};

export type TFlavor = {
  id: string;
  value: string;
  isValid: boolean;
  checked: boolean;
};

type MenuItemProps = {
  menuItem: IMenuItem;
  openAddToOrderHandler: (menuItem: IMenuItem) => void;
};

export const Menu = () => {
  const menu: IMenuItem[] = useFetch('/menu', 'items').data;
  const [initialValue, setInitialValue] = useState<string>();
  const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);
  const [openOrder, setOpenOrder] = useState<boolean>(false);

  const openAddToOrderHandler = (menuItem: IMenuItem) => {
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

  const closeAddToOrderHandler = () => {
    setOpenOrder(false);
    setMenuItem(null);
  };

  //displays menu items when menu and menu.length exist... breaks otherwise.
  return (
    <>
      <h1>Menu</h1>
      {!menu.length ? (
        <LoadingSpinner />
      ) : (
        <ul className="items">
          {menu.length &&
            menu.map((menuItem: IMenuItem) => (
              <MenuItem
                menuItem={menuItem}
                openAddToOrderHandler={openAddToOrderHandler}
              />
            ))}
        </ul>
      )}

      {openOrder && menuItem && initialValue && (
        <AddMenuItemToOrder
          menuItem={menuItem}
          setMenuItem={setMenuItem}
          initialValue={initialValue}
          closeHandler={closeAddToOrderHandler}
        />
      )}
    </>
  );
};

const MenuItem = (props: MenuItemProps) => {
  const { menuItem, openAddToOrderHandler } = props;
  const [ID, setID] = useState<string>();

  //onClick of menu item, displays menu item description
  const descriptionHandler = (menuItem: IMenuItem) => {
    if (ID === null || ID !== menuItem._id) {
      setID(menuItem._id);
    } else {
      setID('');
    }
  };

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
          onClick={() => openAddToOrderHandler(menuItem)}
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
};
