import { useState, useCallback } from 'react';
import { IMenuItem } from '../../pages/menu/Menu';

export const useItems = (
  menuItems: IMenuItem[],
  type: 'menu' | 'deal',
  price: number
) => {
  const [updatedItems, setUpdatedItems] = useState<IMenuItem[] | null>(
    menuItems
  );
  const [totalPrice, setTotalPrice] = useState(price);
  const [quantity, setQuantity] = useState(1);

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

  return {
    updatedItems,
    totalPrice,
    quantity,
    updateItemHandler,
    totalPriceHandler,
  };
};
