import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { IMenuItem } from "../../pages/menu/Menu";
import { TFlavorValue, TItemOption, TSizeValue } from "../../types/OptionTypes";

import { Input } from "../elements/form/Input";
import { VALIDATOR_MIN } from '../util/validators';

type MenuItemInputsProps = {
   id: string;
   initialFlavorValue: TFlavorValue | null;
   initialSizeValue: TSizeValue | null;
   inputHandler: (
     id: string,
     userInputValue: string,
     userInputIsValid: boolean
   ) => void;
   updatedItem: IMenuItem;
   quantity: number;
   setUpdatedItem: Dispatch<SetStateAction<IMenuItem>>;
   setQuantity: Dispatch<SetStateAction<number>>;
   totalHandler: (quantity: number, itemPrice: number) => void;
   disabled?: boolean;
 };

export const MenuItemInputs = (props: MenuItemInputsProps) => {
  const {
    disabled,
    initialFlavorValue,
    initialSizeValue,
    inputHandler,
    updatedItem,
    quantity,
    setUpdatedItem,
    setQuantity,
    totalHandler,
  } = props;
  const [size, setSize] = useState<TSizeValue | null>(initialSizeValue);
  const [flavor, setFlavor] = useState<TFlavorValue | null>(initialFlavorValue);

  //handles the price of each item to update with quantity changes
  useEffect(() => {
    let optionsTotal = 0;
    let itemTotal = 0;
    updatedItem.options.forEach((option) => {
      if (option.checked) optionsTotal += option.price;
    });
    if (size && updatedItem.sizes) {
      const itemPrice = updatedItem.sizes.find(
        (itemSize) => itemSize.value.toLowerCase() === size.toLowerCase()
      )!.price;
      itemTotal = itemPrice + optionsTotal;
    } else itemTotal = updatedItem.price + optionsTotal;
    totalHandler(quantity, itemTotal);
  }, [
    quantity,
    totalHandler,
    size,
    updatedItem.options,
    updatedItem.sizes,
    updatedItem.price,
  ]);

  //sets options array based on checked inputs
  const optionsHandler = (userOption: TItemOption, isChecked: boolean) => {
    const newOptions = [...updatedItem.options];
    const newItem = {
      ...updatedItem,
    };
    newOptions.find(
      (newOption) => newOption.name === userOption.name
    )!.checked = isChecked;
    newItem.options = newOptions;
    setUpdatedItem(newItem);
  };

  //gets size value from select input
  const sizeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value as TSizeValue);
  };

  const flavorHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFlavor(event.target.value as TFlavorValue);
  };
  return (
    <>
      {size && updatedItem.sizes && (
        <Input
          id="size"
          element="select"
          type="select"
          label="Size:"
          selection={updatedItem?.sizes}
          onInput={inputHandler}
          initialValue={size}
          sizeHandler={sizeHandler}
          errorText="Please pick a valid size"
          disabled={disabled}
          dataTestID="size"
        />
      )}
      {flavor && updatedItem.flavors && (
        <Input
          id="flavor"
          element="select"
          type="select"
          label="Flavor:"
          selection={updatedItem.flavors}
          onInput={inputHandler}
          initialValue={flavor}
          flavorHandler={flavorHandler}
          errorText="Please pick a valid flavor"
          disabled={false}
          dataTestID="flavor"
        />
      )}
      {updatedItem.options.length
        ? updatedItem.options.map((option) => (
            <Input
              key={option.name}
              id={option.name}
              element="checkbox"
              type="checkbox"
              label={option.name}
              onInput={inputHandler}
              option={option}
              optionsHandler={optionsHandler}
              initialValue={option.name}
              errorText="Please pick a valid topping"
              dataTestID={option.name}
            />
          ))
        : null}
      <Input
        id="quanity"
        element="number"
        errorText="You must add at least 1 item"
        initialValue={'1'}
        label="Quantity:"
        onInput={inputHandler}
        setQuantity={setQuantity}
        type="number"
        validators={[VALIDATOR_MIN(1)]}
        disabled={disabled}
        dataTestID="quantity"
      />
    </>
  );
};
