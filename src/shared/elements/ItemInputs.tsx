import { useState, useEffect } from 'react';

import { VALIDATOR_MIN } from '../util/validators';
import { Input } from './formElements/Input';

import { IDeal } from '../hooks/database/deal-hook';
import { IMenuItem, TItemOption } from '../hooks/database/menu-hook';

type ItemInputsProps = {
  id: string;
  options: TItemOption[];
  size?: string;
  hasSizes?: boolean;
  deal?: IDeal;
  item?: IMenuItem;
  inputHandler: (
    id: string,
    userInputValue: string,
    userInputIsValid: boolean
  ) => void;
  priceHandler: (quantity: number, itemPrice: number) => void;
  disabled?: boolean;
};

const sizes = [
  { id: 'small', value: 'Small', isValid: true, price: 8.99, inches: 10 },
  { id: 'medium', value: 'Medium', isValid: true, price: 11.99, inches: 14 },
  { id: 'large', value: 'Large', isValid: true, price: 15.99, inches: 16 },
];

export const ItemInputs = (props: ItemInputsProps) => {
  //handles quantity of item addition to order
  const [quantity, setQuantity] = useState(0);
  const [options, setOptions] = useState<TItemOption[]>([]);
  const dealQuantity = props.deal && {
    pizzas: props.deal.items.filter((item) => item === 0).length,
    sodas: props.deal.items.filter((item) => item === 3).length,
  };

  //handles the price of each item to update with quantity changes
  const { priceHandler, item } = props;
  useEffect(() => {
    if (item) {
      let optionsTotal = 0;
      let itemTotal = 0;
      options.forEach((option) => {
        optionsTotal += option.price;
      });
      itemTotal = item.price + optionsTotal;
      priceHandler(quantity, itemTotal);
    }
  }, [quantity, priceHandler, item, options]);

  const optionsHandler = (userOption: TItemOption, isChecked: boolean) => {
    if (isChecked) setOptions([...options, userOption]);
    if (!isChecked)
      setOptions(options.filter((option) => option.name !== userOption.name));
  };

  return (
    <>
      {props.hasSizes && (
        <Input
          id="size"
          element="select"
          type="select"
          label="Size:"
          sizes={sizes}
          onInput={props.inputHandler}
          initialValue={props.size ? props.size : 'Medium'}
          errorText="Please pick a valid size"
          disabled={props.disabled}
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
              options={options}
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
