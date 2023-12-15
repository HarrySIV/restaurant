import { useEffect, useCallback, useState } from 'react';
import { TFlavorValue, TSizeValue } from '../../types/OptionTypes';

import { IMenuItem } from './../../pages/menu/Menu';

export const useInputs = (menuItem: IMenuItem | null, formStateInputs: any) => {
  const [updatedItem, setUpdatedItem] = useState(menuItem);

  //update item by formStateInputs and return the new item
  const updateItemSelection = useCallback(
    (
      selectionType: 'flavors' | 'sizes',
      selectionValue: TFlavorValue | TSizeValue
    ) => {
      const updatedSelection = menuItem![selectionType]?.map((selection) => {
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
      return updatedSelection;
    },
    [menuItem]
  );

  const updateItemTopping = useCallback(
    (toppingValue: 'Pepperoni' | 'Sausage' | 'Mushroom', checked: boolean) => {
      const updatedToppings = menuItem!.options?.map((option) => {
        if (toppingValue === option.name) {
          return { ...option, checked: checked };
        } else
          return {
            ...option,
          };
      });
      return updatedToppings;
    },
    [menuItem]
  );

  useEffect(() => {
    if (!menuItem) return;
    for (const key in formStateInputs) {
      if (key === 'size') {
        updateItemSelection(
          index,
          'sizes',
          formStateInputs.size.value as TSizeValue
        );
      }
      if (key === 'flavor') {
        updateItemSelection(
          index,
          'flavors',
          formStateInputs.flavor.value as TFlavorValue
        );
      }
      if (key === 'Pepperoni' || 'Sausage' || 'Mushroom') {
        updateItemTopping(
          index,
          key as 'Pepperoni' | 'Sausage' | 'Mushroom',
          formStateInputs[key].checked!
        );
      }
    }
  }, [menuItem, formStateInputs, updateItemSelection, updateItemTopping]);

  return [updatedItem];
};
