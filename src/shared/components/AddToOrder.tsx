import React, { useCallback, useState } from 'react';

import { IMenuItem } from '../../pages/menu/Menu';

import { useOrderContext } from '../../shared/hooks/orderContext/OrderContext';

import { ItemToAdd } from './ItemToAdd';

import { LoadingSpinner } from '../elements/ui/LoadingSpinner';
import { Button } from '../../shared/elements/form/Button';

import './_AddToOrder.scss';

type TAddToOrderProps = {
  closeHandler: () => void;
  menuItems: IMenuItem[];
  price: number;
  type: 'deal' | 'menu';
};

export const AddToOrder = (props: TAddToOrderProps) => {
  const { closeHandler, menuItems, price, type } = props;
  const orderContext = useOrderContext();
  const [totalPrice, setTotalPrice] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [updatedItems, setUpdatedItems] = useState<IMenuItem[] | null>(
    menuItems
  );

  const totalPriceHandler = useCallback(
    (quantity: number, itemPrice: number) => {
      if (quantity > 0 && type === 'menu') {
        setQuantity(quantity);
        setTotalPrice(quantity * itemPrice);
      }
    },
    [type]
  );

  const updateItemHandler = useCallback(
    (itemIndex: number, updatedItem: IMenuItem) => {
      setUpdatedItems((previousItems) => {
        return previousItems?.map((previousItem, prevItemIndex) => {
          if (itemIndex === prevItemIndex) {
            return {
              ...updatedItem,
            };
          } else
            return {
              ...previousItem,
            };
        }) as IMenuItem[];
      });
    },
    []
  );

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
    setUpdatedItems(null);
    closeHandler();
  };

  if (!updatedItems) return <LoadingSpinner />;
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
              setUpdatedItems={setUpdatedItems}
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
