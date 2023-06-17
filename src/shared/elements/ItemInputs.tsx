import { useState, useEffect } from 'react';
import { VALIDATOR_MIN } from '../util/validators';
import { Input } from './formElements/Input';
import { IDeal } from '../hooks/database/deal-hook';
import { IMenuItem } from '../hooks/database/menu-hook';

type ItemInputsProps = {
  id: string;
  hasSizes: boolean;
  size?: string;
  deal?: IDeal;
  item?: IMenuItem;
  setItemToppings: React.Dispatch<React.SetStateAction<any[]>>;
  inputHandler: (
    id: string,
    userInputValue: string,
    userInputIsValid: boolean
  ) => void;
  priceHandler: (quantity: number, itemPrice: number) => void;
  disabled?: boolean;
};

const sizes = [
  { id: 'small', value: 'Small', isValid: true },
  { id: 'medium', value: 'Medium', isValid: true },
  { id: 'large', value: 'Large', isValid: true },
];

export const ItemInputs = (props: ItemInputsProps) => {
  //handles quantity of item addition to order
  const [quantity, setQuantity] = useState<number>(0);
  const dealQuantity = props.deal && {
    pizzas: props.deal.items.filter((item) => item === 0).length,
    sodas: props.deal.items.filter((item) => item === 3).length,
  };

  //handles the price of each item to update with quantity changes
  const { priceHandler, item } = props;
  useEffect(() => {
    if (item) priceHandler(quantity, item.price);
  }, [quantity, priceHandler, item]);

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
      {item && item.options && item.options.length
        ? item.options.map((option) => (
            <Input
              key={option.id}
              id={option.id}
              element="checkbox"
              type="checkbox"
              label={option.name}
              onInput={props.inputHandler}
              initialValue={option.price}
              setItemToppings={props.setItemToppings}
              itemToppings={props.itemToppings}
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
