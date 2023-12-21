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

export const xuseItemsx = (
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
    [menuItems]
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
    if (!menuItem || !formState.inputs) return;
    let options = [] as TItemOption[];
    let sizes = [] as TSize[];
    let flavors = [] as TFlavorValue[];

    for (const key in formState.inputs) {
      switch (key) {
        case 'size':
          sizes = updateItemSelection(
            'sizes',
            formState.inputs.size.value as TSizeValue
          );
          break;
        case 'flavor':
          flavors = updateItemSelection(
            'flavors',
            formState.inputs.flavor.value as TFlavorValue
          );
          break;
        case 'Pepperoni':
          options.push(
            updateItemTopping(
              key as 'Pepperoni',
              formState.inputs[key].checked
            )!
          );
          break;
        case 'Sausage':
          options.push(
            updateItemTopping(key as 'Sausage', formState.inputs[key].checked)!
          );
          break;
        case 'Mushroom':
          options.push(
            updateItemTopping(key as 'Mushroom', formState.inputs[key].checked)!
          );
          break;
        default:
          break;
      }
    }

    setUpdatedItems({
      ...updatedItem,
      options: options,
      sizes: sizes,
      flavors: flavors,
    });
  }, [
    menuItem,
    formState.inputs,
    updateItemSelection,
    updateItemTopping,
    updatedItem,
  ]);

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
