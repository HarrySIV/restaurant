import { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { useForm } from '../shared/hooks/form-hook';
import { useOrderContext } from '../shared/hooks/orderContext/OrderContext';

import { IMenuItem, TItemOption } from '../shared/hooks/database/menu-hook';

import { Modal } from '../shared/elements/ui/Modal';
import { Button } from '../shared/elements/form/Button';
import { Input } from '../shared/elements/form/Input';

import { VALIDATOR_MIN } from '../shared/util/validators';

import './_AddToOrder.scss';

interface IAddMenuItemToOrderProps {
  closeHandler: () => void;
  initialValue: string;
  menuItem: IMenuItem;
  setMenuItem: Dispatch<SetStateAction<IMenuItem | null>>;
}

type MenuItemInputsProps = {
  id: string;
  initialValue: string;
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
  type: 'menu-item';
  disabled?: boolean;
};

export const AddMenuItemToOrder = (props: IAddMenuItemToOrderProps) => {
  const orderContext = useOrderContext();
  const [formState, inputHandler] = useForm({}, true);
  const [total, setTotal] = useState(props.menuItem.price);
  const [quantity, setQuantity] = useState(1);

  const totalHandler = (quantity: number, itemPrice: number) => {
    if (quantity > 0) setTotal(quantity * itemPrice);
  };

  const itemSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.menuItem) {
      orderContext.addToOrder({
        item: props.menuItem,
        quantity: quantity,
        total: total,
      });
      props.closeHandler();
    }
  };

  return (
    <Modal header="Add to Order" closeHandler={props.closeHandler}>
      <form className="order-form" onSubmit={itemSubmitHandler}>
        <fieldset>
          {props.menuItem && props.initialValue && (
            <div key={props.menuItem._id}>
              <legend>{props.menuItem.name}</legend>
              <MenuItemInputs
                type="menu-item"
                id={`${props.menuItem._id}`}
                menuItem={props.menuItem}
                setMenuItem={props.setMenuItem}
                inputHandler={inputHandler}
                totalHandler={totalHandler}
                initialValue={props.initialValue}
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
    initialValue,
    inputHandler,
    menuItem,
    quantity,
    setMenuItem,
    setQuantity,
    totalHandler,
    type,
  } = props;
  const [size, setSize] = useState(initialValue);

  //handles the price of each item to update with quantity changes
  useEffect(() => {
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
  }, [
    quantity,
    totalHandler,
    size,
    type,
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
  const sizeHandler = (event: any) => {
    setSize(event.target.value);
  };

  return (
    <>
      {!!menuItem.sizes?.length && (
        <Input
          id="size"
          element="select"
          type="select"
          label="Size:"
          selection={menuItem?.sizes}
          onInput={inputHandler}
          initialValue={initialValue}
          selectionHandler={sizeHandler}
          errorText="Please pick a valid size"
          disabled={disabled}
        />
      )}
      {!!menuItem.flavors?.length && (
        <Input
          id="flavor"
          element="select"
          type="select"
          label="Flavor:"
          selection={menuItem.flavors}
          onInput={inputHandler}
          initialValue={initialValue}
          selectionHandler={sizeHandler}
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
