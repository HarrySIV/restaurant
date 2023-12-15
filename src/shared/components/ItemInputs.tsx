import { Dispatch, SetStateAction } from 'react';

import { IMenuItem } from '../../pages/menu/Menu';

import { Input } from '../elements/form/Input';
import { VALIDATOR_MIN } from '../util/validators';

type ItemInputsProps = {
  id: string;
  inputHandler: (
    id: string,
    userInputValue: string,
    userInputIsValid: boolean
  ) => void;
  updatedItem: IMenuItem;
  setUpdatedItem: Dispatch<SetStateAction<IMenuItem>>;
  disabled?: boolean;
};

export const ItemInputs = (props: ItemInputsProps) => {
  const { disabled, inputHandler, updatedItem } = props;

  return (
    <>
      {updatedItem.sizes && updatedItem.sizes.length > 0 && (
        <Input
          id="size"
          element="select"
          type="select"
          label="Size:"
          selection={updatedItem?.sizes}
          onInput={inputHandler}
          initialValue={
            updatedItem.sizes?.find((size) => size.checked === true)?.id!
          }
          errorText="Please pick a valid size"
          disabled={disabled}
          dataTestID="size"
        />
      )}
      {updatedItem.flavors && updatedItem.flavors.length > 0 && (
        <Input
          id="flavor"
          element="select"
          type="select"
          label="Flavor:"
          selection={updatedItem.flavors}
          onInput={inputHandler}
          initialValue={
            updatedItem.flavors?.find((flavor) => flavor.checked === true)?.id!
          }
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
              initialValue={option.name}
              errorText="Please pick a valid topping"
              dataTestID={option.name}
            />
          ))
        : null}
      <Input
        id="quantity"
        element="number"
        errorText="You must add at least 1 item"
        initialValue={'1'}
        label="Quantity:"
        onInput={inputHandler}
        type="number"
        validators={[VALIDATOR_MIN(1)]}
        disabled={disabled}
        dataTestID="quantity"
      />
    </>
  );
};
