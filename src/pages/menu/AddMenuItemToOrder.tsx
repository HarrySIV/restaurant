import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { TFlavorValue, TItemOption, TSizeValue } from '../../types/OptionTypes';

import { useForm } from '../../shared/hooks/form-hook';
import {
  TOrderSubmission,
  useOrderContext,
} from '../../shared/hooks/orderContext/OrderContext';

import { IMenuItem } from './Menu';

import { Button } from '../../shared/elements/form/Button';
import { Input } from '../../shared/elements/form/Input';

import { VALIDATOR_MIN } from '../../shared/util/validators';

import '../_AddToOrder.scss';

interface IAddMenuItemToOrderProps {
  closeHandler: () => void;
  initialFlavorValue: TFlavorValue | null;
  initialSizeValue: TSizeValue | null;
  menuItem: IMenuItem;
}

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

export const AddMenuItemToOrder = (props: IAddMenuItemToOrderProps) => {
  const { closeHandler, initialFlavorValue, initialSizeValue, menuItem } =
    props;
  const orderContext = useOrderContext();
  const [formState, inputHandler] = useForm({}, true);
  const [total, setTotal] = useState(menuItem.price);
  const [quantity, setQuantity] = useState(1);
  const [updatedItem, setUpdatedItem] = useState(menuItem);

  useEffect(() => {
    // updates all properties to match user inputs
    //need to setUpdatedItem instead of mutating updatedItem directly
    for (const key in formState.inputs) {
      if (key === 'size') {
        updatedItem.sizes?.forEach((size, index) => {
          if (size.id === formState.inputs.size.value) {
            // const newSize = [...previousItem.sizes]
            setUpdatedItem(previousItem => {
              ...previousItem,
              previousItem.sizes
            })
            updatedItem.sizes![index].checked = true;
          } else {
            updatedItem.sizes![index].checked = false;
          }
        });
        console.log(menuItem);
      }

      updatedItem.options.forEach((option, index) => {
        if (key === option.name)
          updatedItem.options[index].checked =
            formState.inputs[key].checked || false;
      });
    }
  }, [updatedItem, formState.inputs]);

  const totalHandler = (quantity: number, itemPrice: number) => {
    if (quantity > 0) setTotal(quantity * itemPrice);
  };

  const itemSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    orderContext.addToOrder({
      item: updatedItem,
      quantity: quantity,
      total: total,
      type: 'menuItem',
    } as TOrderSubmission);
    setUpdatedItem(menuItem);
    closeHandler();
  };

  return (
    <form
      className="order-form"
      onSubmit={itemSubmitHandler}
      data-testid="addToOrder"
    >
      <fieldset>
        {updatedItem && (
          <div key={updatedItem._id}>
            <legend>{updatedItem.name}</legend>
            <MenuItemInputs
              id={`${updatedItem._id}`}
              updatedItem={updatedItem}
              setUpdatedItem={setUpdatedItem}
              inputHandler={inputHandler}
              totalHandler={totalHandler}
              initialFlavorValue={initialFlavorValue}
              initialSizeValue={initialSizeValue}
              quantity={quantity}
              setQuantity={setQuantity}
              disabled={false}
            />
            <h2>${total.toFixed(2)}</h2>
            <hr />
          </div>
        )}
      </fieldset>
      <Button
        type="submit"
        text="ADD TO ORDER"
        onClick={itemSubmitHandler}
        disabled={!formState.isFormValid}
      />
    </form>
  );
};

const MenuItemInputs = (props: MenuItemInputsProps) => {
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
