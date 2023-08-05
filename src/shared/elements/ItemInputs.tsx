import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { VALIDATOR_MIN } from '../util/validators';
import { Input } from './formElements/Input';

import { IDeal } from '../hooks/database/deal-hook';
import { IMenuItem, TItemOption } from '../hooks/database/menu-hook';

type ItemInputsProps = {
  id: string;
  deal?: IDeal;
  menuItem?: IMenuItem;
  setMenuItem?: Dispatch<SetStateAction<IMenuItem | null>>;
  initialValue: string;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  inputHandler: (
    id: string,
    userInputValue: string,
    userInputIsValid: boolean
  ) => void;
  totalHandler: (quantity: number, itemPrice: number) => void;
  disabled?: boolean;
};

export const ItemInputs = (props: ItemInputsProps) => {
  const {
    totalHandler,
    menuItem,
    setMenuItem,
    initialValue,
    quantity,
    setQuantity,
  } = props;
  const [size, setSize] = useState(initialValue);
  const dealQuantity = props.deal && {
    pizzas: props.deal.items.filter((item) => item === 0).length,
    sodas: props.deal.items.filter((item) => item === 3).length,
  };

  //handles the price of each item to update with quantity changes
  useEffect(() => {
    if (!menuItem) return;
    let optionsTotal = 0;
    let itemTotal = 0;
    menuItem.options.forEach((option) => {
      if (option.checked) optionsTotal += option.price;
    });
    if (menuItem.sizes?.length) {
      const itemPrice = menuItem.sizes.find(
        (itemSize) => itemSize.value === size
      )!.price;
      itemTotal = itemPrice + optionsTotal;
    } else itemTotal = menuItem.price + optionsTotal;
    totalHandler(quantity, itemTotal);
  }, [quantity, totalHandler, menuItem, size]);

  //sets options array based on checked inputs
  const optionsHandler = (userOption: TItemOption, isChecked: boolean) => {
    if (!menuItem || !setMenuItem) return;
    const newOptions = [...menuItem.options];
    const newItem = {
      ...menuItem,
    };
    newOptions.find(
      (newOption) => newOption.name === userOption.name
    )!.checked = isChecked;
    newItem.options = newOptions;
    setMenuItem(newItem);
  };

  //gets size value from select input
  const sizeHandler = (event: any) => {
    setSize(event.target.value);
  };

  return (
    <>
      {!!menuItem?.sizes?.length && (
        <Input
          id="size"
          element="select"
          type="select"
          label="Size:"
          selection={menuItem?.sizes}
          onInput={props.inputHandler}
          initialValue={initialValue}
          selectionHandler={sizeHandler}
          errorText="Please pick a valid size"
          disabled={props.disabled}
        />
      )}
      {!!menuItem?.flavors?.length && (
        <Input
          id="flavor"
          element="select"
          type="select"
          label="Flavor:"
          selection={menuItem.flavors}
          onInput={props.inputHandler}
          initialValue={initialValue}
          selectionHandler={sizeHandler}
          errorText="Please pick a valid flavor"
          disabled={false}
        />
      )}
      {menuItem && menuItem.options.length
        ? menuItem.options.map((option) => (
            <Input
              key={option.name}
              id={option.name}
              element="checkbox"
              type="checkbox"
              label={option.name}
              onInput={props.inputHandler}
              option={option}
              optionsHandler={optionsHandler}
              initialValue={option.name}
              errorText="Please pick a valid topping"
            />
          ))
        : null}
      <Input
        id="quanity"
        element="number"
        type="number"
        label="Quantity:"
        onInput={props.inputHandler}
        setQuantity={setQuantity}
        initialValue={
          (dealQuantity &&
            dealQuantity.pizzas > 0 &&
            dealQuantity.pizzas.toString()) ||
          (dealQuantity && dealQuantity.sodas && dealQuantity.sodas.toString())
        }
        validators={[VALIDATOR_MIN(1)]}
        errorText="You must add at least 1 item"
        disabled={props.disabled}
      />
      <Input
        id="_id"
        element="text"
        type="text"
        label="_id"
        placeholder={props.id}
        onInput={props.inputHandler}
        initialValue={props.id}
        hidden={true}
        errorText="A valid ID was not passed"
      />
    </>
  );
};
