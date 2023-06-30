import { useState, useEffect } from 'react';

import { VALIDATOR_MIN } from '../util/validators';
import { Input } from './formElements/Input';

import { IDeal } from '../hooks/database/deal-hook';
import { IMenuItem, TItemOption } from '../hooks/database/menu-hook';

type ItemInputsProps = {
  id: string;
  deal?: IDeal;
  item?: IMenuItem;
  initialValue: string;
  inputHandler: (
    id: string,
    userInputValue: string,
    userInputIsValid: boolean
  ) => void;
  totalHandler: (quantity: number, itemPrice: number) => void;
  disabled?: boolean;
};

const DEFAULTPIZZAPRICE = 11.99;

export const ItemInputs = (props: ItemInputsProps) => {
  const { totalHandler, item, initialValue } = props;
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState<TItemOption[]>([]);
  const [size, setSize] = useState(initialValue);
  const dealQuantity = props.deal && {
    pizzas: props.deal.items.filter((item) => item === 0).length,
    sodas: props.deal.items.filter((item) => item === 3).length,
  };

  //handles the price of each item to update with quantity changes
  useEffect(() => {
    if (!item) return;
    let optionsTotal = 0;
    let itemTotal = 0;
    let itemPrice = DEFAULTPIZZAPRICE;
    options.forEach((option) => {
      optionsTotal += option.price;
    });
    if (item.sizes?.length) {
      itemPrice = item.sizes.find((itemSize) => itemSize.value === size)!.price;
      itemTotal = itemPrice + optionsTotal;
    } else itemTotal = item.price + optionsTotal;
    totalHandler(quantity, itemTotal);
  }, [quantity, totalHandler, item, options, size]);

  const optionsHandler = (userOption: TItemOption, isChecked: boolean) => {
    if (isChecked) setOptions([...options, userOption]);
    if (!isChecked)
      setOptions(options.filter((option) => option.name !== userOption.name));
  };

  const sizeHandler = (event: any) => {
    setSize(event.target.value);
  };

  return (
    <>
      {!!props.item?.sizes?.length && (
        <Input
          id="size"
          element="select"
          type="select"
          label="Size:"
          selection={props.item.sizes}
          onInput={props.inputHandler}
          initialValue={initialValue}
          selectionHandler={sizeHandler}
          errorText="Please pick a valid size"
          disabled={props.disabled}
        />
      )}
      {!!props.item?.flavors?.length && (
        <Input
          id="flavor"
          element="select"
          type="select"
          label="Flavor:"
          selection={props.item.flavors}
          onInput={props.inputHandler}
          initialValue={initialValue}
          selectionHandler={sizeHandler}
          errorText="Please pick a valid flavor"
          disabled={false}
        />
      )}
      {item && item.options.length
        ? item.options.map((option) => (
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
