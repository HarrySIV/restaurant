import { useState, Dispatch, SetStateAction, useEffect } from 'react';

import { IDeal } from './Deals';
import { useForm } from '../../shared/hooks/form-hook';
import { IMenuItem, TItemOption } from '../menu/Menu';
import { useFetch } from '../../shared/hooks/fetch-hook';
import { useOrderContext } from '../../shared/hooks/orderContext/OrderContext';

import { Modal } from '../../shared/elements/ui/Modal';
import { Button } from '../../shared/elements/form/Button';
import { Input } from '../../shared/elements/form/Input';

import { VALIDATOR_MIN, VALIDATOR_MAX } from '../../shared/util/validators';

interface IAddDealToOrderProps {
  deal: IDeal;
  dealItems: TDealItem[];
  initialValues: { type: string; value: string }[];
  closeHandler: () => void;
}

export type TDealItem = IMenuItem;

type DealItemInputsProps = {
  dealItem: TDealItem;
  id: string;
  initialValues: { type: string; value: string }[];
  inputHandler: (
    id: string,
    userInputValue: string,
    userInputIsValid: boolean
  ) => void;
  orderItems: TDealItem[];
  quantity: number;
  setOrderItems: Dispatch<SetStateAction<TDealItem[]>>;
  setQuantity: Dispatch<SetStateAction<number>>;
};

export const AddDealToOrder = (props: IAddDealToOrderProps) => {
  const { deal, dealItems, initialValues, closeHandler } = props;
  const orderContext = useOrderContext();
  const [formState, inputHandler] = useForm({}, true);
  const [total, setTotal] = useState(deal.total);
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState(dealItems);

  const dealSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    orderContext.addToOrder({
      item: orderItems,
      quantity: 1,
      total: total,
    });
  };

  return (
    <Modal header="Add to Order" closeHandler={closeHandler}>
      <form className="order-form" onSubmit={dealSubmitHandler}>
        <fieldset>
          {deal && (
            <>
              {dealItems.map((dealItem) => (
                <div key={deal._id}>
                  <legend>{deal.name}</legend>
                  <DealItemInputs
                    dealItem={dealItem}
                    id={`${deal._id}`}
                    initialValues={initialValues}
                    inputHandler={inputHandler}
                    orderItems={orderItems}
                    setOrderItems={setOrderItems}
                    // totalHandler={totalHandler}
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                  <h2>${total.toFixed(2)}</h2>
                  <hr />
                </div>
              ))}
            </>
          )}
        </fieldset>
        <Button
          type="submit"
          text="ADD TO ORDER"
          onClick={dealSubmitHandler}
          disabled={!formState.isFormValid}
        />
      </form>
    </Modal>
  );
};

const DealItemInputs = (props: DealItemInputsProps) => {
  const menu: IMenuItem[] = useFetch('/menu', 'items').data;
  const {
    dealItem,
    initialValues,
    inputHandler,
    orderItems,
    setOrderItems,
    setQuantity,
  } = props;
  const [menuItem, setMenuItem] = useState(
    menu.find((item) => item._id === dealItem._id)!
  );
  const [size, setSize] = useState<string>();

  useEffect(() => {
    //whenever menuItem changes, update the corresponding orderItem
    const newItems = orderItems.map((orderItem) => {
      if (orderItem._id !== dealItem._id) {
        return orderItem;
      } else return menuItem;
    });
    setOrderItems(newItems);
  }, [orderItems, menuItem, setOrderItems, dealItem._id]);

  if (!menuItem) return <h1>No menu item found</h1>;

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
          initialValue={size!}
          sizeHandler={sizeHandler}
          errorText="Please pick a valid size"
          disabled={true}
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
          initialValue={
            initialValues.find((value) => value.type === 'flavor')!.value
          }
          errorText="Please pick a valid flavor"
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
        disabled={true}
      />
      <Input
        id="_id"
        element="text"
        type="text"
        label="_id"
        placeholder={menuItem._id}
        onInput={inputHandler}
        initialValue={menuItem._id}
        hidden={true}
        errorText="A valid ID was not passed"
      />
    </>
  );
};
