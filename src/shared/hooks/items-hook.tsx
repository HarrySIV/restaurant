import { useState, useEffect, useCallback } from 'react';

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

  const updateItemHandler = useCallback(
    (itemToUpdateIndex: number, itemToUpdate: IMenuItem) => {
      console.log(itemToUpdate);
      setUpdatedItems((prevItems) => {
        return prevItems?.map((prevItem, index) => {
          if (index === itemToUpdateIndex) {
            return {
              ...itemToUpdate,
            };
          } else
            return {
              ...prevItem,
            };
        })!;
      });
    },
    []
  );

  //updates the price based on input quantity and toppings
  useEffect(() => {
    if (!updatedItems || type === 'deal') return;
    const item = updatedItems[0];
    let optionsTotal = 0;
    let itemTotal = 0;
    item.options.forEach((option) => {
      if (option.checked) optionsTotal += option.price;
    });
    const size = item.sizes?.find((size) => size.checked === true)?.id;
    if (size && item.sizes) {
      const itemPrice = item.sizes.find(
        (itemSize) => itemSize.value.toLowerCase() === size.toLowerCase()
      )!.price;
      itemTotal = itemPrice + optionsTotal;
    } else {
      itemTotal = item.price + optionsTotal;
    }
    setTotalPrice(itemTotal * quantity);
  }, [updatedItems, type, quantity]);

  return {
    quantity,
    setQuantity,
    totalPrice,
    updatedItems,
    updateItemHandler,
  };
};
