import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { VALIDATOR_MIN } from '../util/validators';
import { Input } from './formElements/Input';

import { IDeal } from '../hooks/database/deal-hook';
import { IMenuItem, TItemOption } from '../hooks/database/menu-hook';

type ItemInputsProps = (GenericProps & DealProps) | (GenericProps & MenuProps);

type GenericProps = {
  id: string;
  initialValue: string;
  inputHandler: (
    id: string,
    userInputValue: string,
    userInputIsValid: boolean
  ) => void;
  totalHandler: (quantity: number, itemPrice: number) => void;
  disabled?: boolean;
};

type MenuProps = {
  type: 'menu-item';
  menuItem: IMenuItem;
  setMenuItem: Dispatch<SetStateAction<IMenuItem | null>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

type DealProps = {
  type: 'deal';
  deal: IDeal;
};

export const ItemInputs = (props: ItemInputsProps) => {
  const { type, totalHandler, initialValue } = props;
  const [size, setSize] = useState(initialValue);
  const dealQuantity = props.type === 'deal' && {
    pizzas: props.deal.items.filter((item) => item === 0).length,
    sodas: props.deal.items.filter((item) => item === 3).length,
  };

  //handles the price of each item to update with quantity changes
  useEffect(() => {
    if (type !== 'menu-item') return;
    let optionsTotal = 0;
    let itemTotal = 0;
    props.menuItem.options.forEach((option) => {
      if (option.checked) optionsTotal += option.price;
    });
    if (props.menuItem.sizes?.length) {
      const itemPrice = props.menuItem.sizes.find(
        (itemSize) => itemSize.value === size
      )!.price;
      itemTotal = itemPrice + optionsTotal;
    } else itemTotal = props.menuItem.price + optionsTotal;
    totalHandler(props.quantity, itemTotal);
  }, [props.quantity, totalHandler, size, type]);

  //sets options array based on checked inputs
  const optionsHandler = (userOption: TItemOption, isChecked: boolean) => {
    if (type !== 'menu-item') return;
    const newOptions = [...props.menuItem.options];
    const newItem = {
      ...props.menuItem,
    };
    newOptions.find(
      (newOption) => newOption.name === userOption.name
    )!.checked = isChecked;
    newItem.options = newOptions;
    props.setMenuItem(newItem);
  };

  //gets size value from select input
  const sizeHandler = (event: any) => {
    setSize(event.target.value);
  };

  return (
    <>
      {type === 'menu-item' && !!props.menuItem.sizes?.length && (
        <Input
          id="size"
          element="select"
          type="select"
          label="Size:"
          selection={props.menuItem?.sizes}
          onInput={props.inputHandler}
          initialValue={initialValue}
          selectionHandler={sizeHandler}
          errorText="Please pick a valid size"
          disabled={props.disabled}
        />
      )}
      {type === 'menu-item' && !!props.menuItem.flavors?.length && (
        <Input
          id="flavor"
          element="select"
          type="select"
          label="Flavor:"
          selection={props.menuItem.flavors}
          onInput={props.inputHandler}
          initialValue={initialValue}
          selectionHandler={sizeHandler}
          errorText="Please pick a valid flavor"
          disabled={false}
        />
      )}
      {type === 'menu-item' && props.menuItem.options.length
        ? props.menuItem.options.map((option) => (
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
        initialValue={
          (dealQuantity &&
            (dealQuantity.pizzas > 0
              ? dealQuantity.pizzas.toString()
              : dealQuantity.sodas > 0
              ? dealQuantity.sodas.toString()
              : '1')) ||
          undefined
        }
        setQuantity={props.}
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
