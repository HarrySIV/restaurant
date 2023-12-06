import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { AddMenuItemToOrder } from './AddMenuItemToOrder';

import { Modal } from '../../shared/elements/ui/Modal';
import { Button } from '../../shared/elements/form/Button';
import { LoadingSpinner } from '../../shared/elements/ui/LoadingSpinner';

import './_menu.scss';
import { useMenuContext } from '../../shared/hooks/menuContext/MenuContext';
import {
  TItemOption,
  TSize,
  TFlavor,
  TSizeValue,
  TFlavorValue,
} from '../../types/OptionTypes';

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

type MenuItemProps = {
  menuItem: IMenuItem;
  openAddToOrderHandler: (menuItem: IMenuItem) => void;
};

export const Menu = () => {
  const menu = useMenuContext();
  const [initialSizeValue, setInitialSizeValue] = useState<TSizeValue | null>(
    null
  );
  const [initialFlavorValue, setInitialFlavorValue] =
    useState<TFlavorValue | null>(null);
  const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);
  const [openOrder, setOpenOrder] = useState<boolean>(false);

  const openAddToOrderHandler = (menuItem: IMenuItem) => {
    setMenuItem(menuItem);
    const sizeSelection = menuItem.sizes?.length ? menuItem.sizes : null;
    const flavorSelection = menuItem.flavors?.length ? menuItem.flavors : null;

    if (flavorSelection) {
      setInitialFlavorValue(
        flavorSelection.find(
          (selectionValue: TFlavor) => selectionValue.checked === true
        )!.id
      );
    }
    if (sizeSelection) {
      setInitialSizeValue(
        sizeSelection.find(
          (selectionValue: TSize) => selectionValue.checked === true
        )!.id
      );
    }
    setOpenOrder(true);
  };

  const closeAddToOrderHandler = () => {
    setOpenOrder(false);
    setInitialFlavorValue(null);
    setInitialSizeValue(null);
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
            menu.map((menuItem: IMenuItem, index) => (
              <MenuItem
                menuItem={menuItem}
                openAddToOrderHandler={openAddToOrderHandler}
                key={index}
              />
            ))}
        </ul>
      )}

      {openOrder && menuItem !== null && (
        <Modal header="Add to Order" closeHandler={closeAddToOrderHandler}>
          <AddMenuItemToOrder
            menuItem={menuItem}
            initialSizeValue={initialSizeValue}
            initialFlavorValue={initialFlavorValue}
            closeHandler={closeAddToOrderHandler}
          />
        </Modal>
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
