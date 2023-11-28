import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { TFlavorValue, TItemOption, TSizeValue } from '../../types/OptionTypes';

import { useForm } from '../../shared/hooks/form-hook';
import {
  TOrderSubmission,
  useOrderContext,
} from '../../shared/hooks/orderContext/OrderContext';

import { IMenuItem } from './Menu';

import { Modal } from '../../shared/elements/ui/Modal';
import { Button } from '../../shared/elements/form/Button';
import { Input } from '../../shared/elements/form/Input';

import { VALIDATOR_MIN } from '../../shared/util/validators';

import '../_AddToOrder.scss';

interface IAddMenuItemToOrderProps {
  closeHandler: () => void;
  initialFlavorValue: TFlavorValue | null;
  initialSizeValue: TSizeValue | null;
  menuItem: IMenuItem;
  setMenuItem: Dispatch<SetStateAction<IMenuItem | null>>;
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
  menuItem: IMenuItem;
  quantity: number;
  setMenuItem: Dispatch<SetStateAction<IMenuItem | null>>;
  setQuantity: Dispatch<SetStateAction<number>>;
  totalHandler: (quantity: number, itemPrice: number) => void;
  disabled?: boolean;
};

export const AddMenuItemToOrder = (props: IAddMenuItemToOrderProps) => {
  const {
    closeHandler,
    initialFlavorValue,
    initialSizeValue,
    menuItem,
    setMenuItem,
  } = props;
  const orderContext = useOrderContext();
  const [formState, inputHandler] = useForm({}, true);
  const [total, setTotal] = useState(menuItem.price);
  const [quantity, setQuantity] = useState(1);

  const totalHandler = (quantity: number, itemPrice: number) => {
    if (quantity > 0) setTotal(quantity * itemPrice);
  };

  const itemSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (menuItem) {
      orderContext.addToOrder({
        item: menuItem,
        quantity: quantity,
        total: total,
        type: 'menuItem',
      } as TOrderSubmission);
      closeHandler();
    }
  };

  return (
    <Modal header="Add to Order" closeHandler={closeHandler}>
      <form className="order-form" onSubmit={itemSubmitHandler}>
        <fieldset>
          {menuItem && (
            <div key={menuItem._id}>
              <legend>{menuItem.name}</legend>
              <MenuItemInputs
                id={`${menuItem._id}`}
                menuItem={menuItem}
                setMenuItem={setMenuItem}
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
    </Modal>
  );
};

const MenuItemInputs = (props: MenuItemInputsProps) => {
  const {
    disabled,
    id,
    initialFlavorValue,
    initialSizeValue,
    inputHandler,
    menuItem,
    quantity,
    setMenuItem,
    setQuantity,
    totalHandler,
  } = props;
  const [size, setSize] = useState<TSizeValue | null>(initialSizeValue);
  const [flavor, setFlavor] = useState<TFlavorValue | null>(initialFlavorValue);

  //handles the price of each item to update with quantity changes
  useEffect(() => {
    let optionsTotal = 0;
    let itemTotal = 0;
    menuItem.options.forEach((option) => {
      if (option.checked) optionsTotal += option.price;
    });
    if (size && menuItem.sizes) {
      const itemPrice = menuItem.sizes.find(
        (itemSize) => itemSize.value.toLowerCase() === size.toLowerCase()
      )!.price;
      itemTotal = itemPrice + optionsTotal;
    } else itemTotal = menuItem.price + optionsTotal;
    totalHandler(quantity, itemTotal);
  }, [
    quantity,
    totalHandler,
    size,
    menuItem.options,
    menuItem.sizes,
    menuItem.price,
  ]);

  //sets options array based on checked inputs
  const optionsHandler = (userOption: TItemOption, isChecked: boolean) => {
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
  const sizeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value as TSizeValue);
  };

  const flavorHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFlavor(event.target.value as TFlavorValue);
  };
  return (
    <>
      {size && menuItem.sizes && (
        <Input
          id="size"
          element="select"
          type="select"
          label="Size:"
          selection={menuItem?.sizes}
          onInput={inputHandler}
          initialValue={size}
          sizeHandler={sizeHandler}
          errorText="Please pick a valid size"
          disabled={disabled}
        />
      )}
      {flavor && menuItem.flavors && (
        <Input
          id="flavor"
          element="select"
          type="select"
          label="Flavor:"
          selection={menuItem.flavors}
          onInput={inputHandler}
          initialValue={flavor}
          flavorHandler={flavorHandler}
          errorText="Please pick a valid flavor"
          disabled={false}
        />
      )}
      {menuItem.options.length
        ? menuItem.options.map((option) => (
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
      />
      <Input
        id="_id"
        element="text"
        type="text"
        label="_id"
        placeholder={id}
        onInput={inputHandler}
        initialValue={id}
        hidden={true}
        errorText="A valid ID was not passed"
      />
    </>
  );
};
