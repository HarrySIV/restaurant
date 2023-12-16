import { useEffect, useCallback, useState } from 'react';
import { TFlavorValue, TSizeValue } from '../../types/OptionTypes';

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
      });

      setUpdatedItem((previousItem) => {
        return {
          ...previousItem,
          [selectionType]: updatedSelection,
        };
      });
    },
    [menuItem]
  );

  /* update item by formStateInputs */
  const updateItemTopping = useCallback(
    (toppingValue: 'Pepperoni' | 'Sausage' | 'Mushroom', checked: boolean) => {
      const updatedToppings = menuItem.options?.map((option) => {
        if (toppingValue === option.name) {
          return { ...option, checked: checked };
        } else
          return {
            ...option,
          };
      });
      setUpdatedItem((previousItem) => {
        return {
          ...previousItem,
          options: updatedToppings,
        };
      });
    },
    [menuItem]
  );

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

  //handles toppings/sizes/flavor inputs
  useEffect(() => {
    if (!menuItem || !formStateInputs) return;
    for (const key in formStateInputs) {
      if (key === 'size') {
        updateItemSelection('sizes', formStateInputs.size.value as TSizeValue);
      }
      if (key === 'flavor') {
        updateItemSelection(
          'flavors',
          formStateInputs.flavor.value as TFlavorValue
        );
      }
      if (key === 'Pepperoni' || 'Sausage' || 'Mushroom') {
        updateItemTopping(
          key as 'Pepperoni' | 'Sausage' | 'Mushroom',
          formStateInputs[key].checked!
        );
      }
    }
  }, [menuItem, formStateInputs, updateItemSelection, updateItemTopping]);

  return { updatedItem };
};
