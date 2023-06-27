import { useState, useEffect } from 'react';

import { VALIDATOR_MIN } from '../util/validators';
import { Input } from './formElements/Input';

import { IDeal } from '../hooks/database/deal-hook';
import { IMenuItem, TItemOption } from '../hooks/database/menu-hook';

type ItemInputsProps = {
  id: string;
  size?: string;
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

export const ItemInputs = (props: ItemInputsProps) => {
  const { priceHandler, item } = props;
  const [quantity, setQuantity] = useState(0);
  const [options, setOptions] = useState<TItemOption[]>([]);
  const [initialValue, setInitialValue] = useState<string>();
  const dealQuantity = props.deal && {
    pizzas: props.deal.items.filter((item) => item === 0).length,
    sodas: props.deal.items.filter((item) => item === 3).length,
  };

  //handles the price of each item to update with quantity changes
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

  // finds and sets the initial value for 'select' input
  useEffect(() => {
    const selection = item!.sizes
      ? item!.sizes
      : item!.flavors
      ? item!.flavors
      : null;
    console.log(selection);
    if (selection?.length)
      setInitialValue(
        selection.find((selectionValue) => selectionValue.checked === true)!
          .value
      );
  }, [props.item?.sizes, props.item?.flavors, item]);

  const optionsHandler = (userOption: TItemOption, isChecked: boolean) => {
    if (isChecked) setOptions([...options, userOption]);
    if (!isChecked)
      setOptions(options.filter((option) => option.name !== userOption.name));
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
