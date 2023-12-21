import { useState, useCallback } from 'react';

import { useForm } from './form-hook';

import {
  TFlavor,
  TFlavorValue,
  TItemOption,
  TSize,
  TSizeValue,
} from '../../types/OptionTypes';
import { IMenuItem } from '../../pages/menu/Menu';

export const useItems = (
  menuItems: IMenuItem[],
  type: 'menu' | 'deal',
  price: number
) => {
  const [formState, inputHandler] = useForm({}, true);
  const [updatedItems, setUpdatedItems] = useState<IMenuItem[] | null>(
    menuItems
  );
  const [totalPrice, setTotalPrice] = useState(price);
  const [quantity, setQuantity] = useState(1);

  const quantityHandler = useCallback(
    (index: number) => {
      if (quantity > 0) {
        setQuantity(quantity);
        setTotalPrice(quantity * itemPrice);
      }
    },
    [quantity]
  );

  const selectionHandler = useCallback(
    (index: number, selectionType: 'size' | 'flavor') => {},
    []
  );

  const toppingHandler = useCallback((index: number) => {}, []);

  //updates the price based on input quantity and toppings
  useEffect(() => {
    if (!formState.inputs.quantity || !updatedItem) return;
    let optionsTotal = 0;
    let itemTotal = 0;
    updatedItem.options.forEach((option) => {
      if (option.checked) optionsTotal += option.price;
    });
    const size = updatedItem.sizes?.find((size) => size.checked === true)?.id;
    if (size && updatedItem.sizes) {
      const itemPrice = updatedItem.sizes.find(
        (itemSize) => itemSize.value.toLowerCase() === size.toLowerCase()
      )!.price;
      itemTotal = itemPrice + optionsTotal;
    } else itemTotal = updatedItem.price + optionsTotal;
    totalPriceHandler(parseInt(formState.inputs.quantity.value), itemTotal);
  }, [formState.inputs, totalPriceHandler]);

  return {
    inputHandler,
    quantity,
    totalPrice,
    totalPriceHandler,
    updatedItems,
    updateItemHandler,
  };
};
