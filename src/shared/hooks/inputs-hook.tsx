import { useEffect, useCallback, useState } from 'react';
import {
  TFlavor,
  TFlavorValue,
  TItemOption,
  TSize,
  TSizeValue,
} from '../../types/OptionTypes';

import { IMenuItem } from './../../pages/menu/Menu';

export const useInputs = (
  menuItem: IMenuItem,
  formStateInputs: any,
  totalPriceHandler: (quantity: number, itemPrice: number) => void
) => {
  const [updatedItem, setUpdatedItem] = useState(menuItem);

  //update item by formStateInputs
  const updateItemSelection = useCallback(
    (
      selectionType: 'flavors' | 'sizes',
      selectionValue: TFlavorValue | TSizeValue
    ) => {
      const updatedSelection = menuItem[selectionType]?.map((selection) => {
        if (selection.id === selectionValue.replace(/\s/g, '')) {
          return {
            ...selection,
            checked: true,
          };
        } else
          return {
            ...selection,
            checked: false,
          };
      }) as TFlavor[] | TSize[];

      return updatedSelection;
    },
    [menuItem]
  );

  /* update item by formStateInputs */
  const updateItemTopping = useCallback(
    (toppingValue: 'Pepperoni' | 'Sausage' | 'Mushroom', checked: boolean) => {
      const topping = updatedItem.options?.find(
        (option) => toppingValue === option.name
      );

      return topping;
    },
    [updatedItem.options]
  );

  //handles toppings/sizes/flavor inputs
  useEffect(() => {
    if (!menuItem || !formStateInputs) return;
    let options = [] as TItemOption[];
    let sizes = [] as TSize[];
    let flavors = [] as TFlavorValue[];

    for (const key in formStateInputs) {
      switch (key) {
        case 'size':
          sizes = updateItemSelection(
            'sizes',
            formStateInputs.size.value as TSizeValue
          );
          break;
        case 'flavor':
          flavors = updateItemSelection(
            'flavors',
            formStateInputs.flavor.value as TFlavorValue
          );
          break;
        case 'Pepperoni':
          options.push(
            updateItemTopping(key as 'Pepperoni', formStateInputs[key].checked)!
          );
          break;
        case 'Sausage':
          options.push(
            updateItemTopping(key as 'Sausage', formStateInputs[key].checked)!
          );
          break;
        case 'Mushroom':
          options.push(
            updateItemTopping(key as 'Mushroom', formStateInputs[key].checked)!
          );
          break;
        default:
          break;
      }
    }

    setUpdatedItem({
      ...updatedItem,
      options: options,
      sizes: sizes,
      flavors: flavors,
    });
  }, [
    menuItem,
    formStateInputs,
    updateItemSelection,
    updateItemTopping,
    updatedItem,
  ]);

  //updates the price based on input quantity and toppings
  useEffect(() => {
    if (!formStateInputs.quantity || !updatedItem) return;
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
    totalPriceHandler(parseInt(formStateInputs.quantity.value), itemTotal);
  }, [formStateInputs, totalPriceHandler, updatedItem]);

  return { updatedItem };
};
