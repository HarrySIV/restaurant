import React from 'react';

import { IMenuItem } from '../../pages/menu/Menu';

import { useOrderContext } from '../../shared/hooks/orderContext/OrderContext';

import { ItemToAdd } from './ItemToAdd';

import { LoadingSpinner } from '../elements/ui/LoadingSpinner';
import { Button } from '../../shared/elements/form/Button';

import './_AddToOrder.scss';
import { useItems } from '../hooks/items-hook';

type TAddToOrderProps = {
  closeHandler: () => void;
  menuItems: IMenuItem[];
  price: number;
  type: 'deal' | 'menu';
};

export const AddToOrder = (props: TAddToOrderProps) => {
  const { closeHandler, menuItems, price, type } = props;
  const orderContext = useOrderContext();
  const {
    updatedItems,
    totalPrice,
    quantity,
    updateItemHandler,
    totalPriceHandler,
  } = useItems(menuItems, type, price);

  const itemSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (updatedItems === null) return;
    orderContext.addToOrder({
      items: updatedItems,
      itemID: Math.random(),
      quantity: quantity,
      itemPrice: totalPrice,
      type: type,
    });
    closeHandler();
  };

  if (!menuItems) return <LoadingSpinner />;
  else
    return (
      <form
        className="order-form"
        key="form"
        onSubmit={itemSubmitHandler}
        data-testid="addToOrder"
      >
        <fieldset key="fieldset">
          {menuItems.map((item, index) => (
            <ItemToAdd
              index={index}
              item={item}
              key={`${item._id}-${index}`}
              totalPriceHandler={totalPriceHandler}
              type={type}
              updateItemHandler={updateItemHandler}
            />
          ))}
        </fieldset>
        <h2>${totalPrice.toFixed(2)}</h2>
        <Button type="submit" text="ADD TO ORDER" onClick={itemSubmitHandler} />
      </form>
    );
};
