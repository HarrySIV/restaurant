import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useMenuContext } from '../../shared/hooks/menuContext/MenuContext';

import { Modal } from '../../shared/elements/ui/Modal';
import { Button } from '../../shared/elements/form/Button';
import { LoadingSpinner } from '../../shared/elements/ui/LoadingSpinner';

import { AddToOrder } from '../../shared/components/AddToOrder';

import { TItemOption, TSize, TFlavor } from '../../types/OptionTypes';

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

type MenuItemProps = {
  menuItem: IMenuItem;
  openAddToOrderHandler: (menuItem: IMenuItem) => void;
};

export const Menu = () => {
  const menu = useMenuContext();
  const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);
  const [openOrder, setOpenOrder] = useState<boolean>(false);

  const openAddToOrderHandler = (menuItem: IMenuItem) => {
    setMenuItem(menuItem);
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
          <AddToOrder
            menuItems={[menuItem]}
            closeHandler={closeAddToOrderHandler}
            price={menuItem.price}
            type='menu'
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
