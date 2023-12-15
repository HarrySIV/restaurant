import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { TFlavorValue, TSizeValue } from '../../types/OptionTypes';
import { IMenuItem } from '../../pages/menu/Menu';

import { useForm } from '../../shared/hooks/form-hook';
import { ItemInputs } from './ItemInputs';

type TItemToAddProps = {
  index: number;
  item: IMenuItem;
  setQuantity: Dispatch<SetStateAction<number>>;
  setUpdatedItems: Dispatch<SetStateAction<IMenuItem[] | null>>;
  totalPriceHandler: (quantity: number, itemPrice: number) => void;
  type: 'deal' | 'menu';
  updatedItems: IMenuItem[];
  updateItemSelection: (
    itemIndex: number,
    selectionType: 'flavors' | 'sizes',
    selectionValue: TFlavorValue | TSizeValue
  ) => void;
  updateItemTopping: (
    itemIndex: number,
    toppingValue: 'Pepperoni' | 'Sausage' | 'Mushroom',
    checked: boolean
  ) => void;
};

export const ItemToAdd = (props: TItemToAddProps) => {
  const {
    index,
    item,
    setQuantity,
    totalPriceHandler,
    type,
    updateItemSelection,
    updateItemTopping,
  } = props;
  const [formState, inputHandler] = useForm({}, true);
  const [updatedItem, setUpdatedItem] = useState(item);

  useEffect(() => {
    for (const key in formState.inputs) {
      if (key === 'size') {
        updateItemSelection(
          index,
          'sizes',
          formState.inputs.size.value as TSizeValue
        );
      }
      if (key === 'flavor') {
        updateItemSelection(
          index,
          'flavors',
          formState.inputs.flavor.value as TFlavorValue
        );
      }
      if (key === 'Pepperoni' || 'Sausage' || 'Mushroom') {
        updateItemTopping(
          index,
          key as 'Pepperoni' | 'Sausage' | 'Mushroom',
          formState.inputs[key].checked!
        );
      }
    }
  }, [index, updateItemSelection, updateItemTopping, formState.inputs]);

  //handles the price of each item to update with quantity changes
  useEffect(() => {
    if (!formState.inputs.quantity) return;
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
    setQuantity(parseInt(formState.inputs.quantity.value));
  }, [
    formState.inputs.quantity,
    totalPriceHandler,
    setQuantity,
    updatedItem.options,
    updatedItem.sizes,
    updatedItem.price,
  ]);

  return (
    <>
      {updatedItem && (
        <div key={updatedItem._id}>
          <legend>{updatedItem.name}</legend>
          <ItemInputs
            id={`${updatedItem._id}`}
            updatedItem={updatedItem}
            setUpdatedItem={setUpdatedItem}
            inputHandler={inputHandler}
            disabled={type === 'deal' ? true : false}
          />
        </div>
      )}
      <hr />
    </>
  );
};
