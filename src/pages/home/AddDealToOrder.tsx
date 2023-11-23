import { useState, Dispatch, SetStateAction, useEffect } from 'react';

import { IDeal } from './Deals';
import { useForm } from '../../shared/hooks/form-hook';
import { IMenuItem } from '../menu/Menu';
import { useOrderContext } from '../../shared/hooks/orderContext/OrderContext';

import { Modal } from '../../shared/elements/ui/Modal';
import { Button } from '../../shared/elements/form/Button';
import { Input } from '../../shared/elements/form/Input';

import { useMenuContext } from '../../shared/hooks/menuContext/MenuContext';
import { TFlavorValue, TItemOption } from '../../types/OptionTypes';

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
  setOrderItems: Dispatch<SetStateAction<TDealItem[]>>;
};

export const AddDealToOrder = (props: IAddDealToOrderProps) => {
  const { deal, dealItems, initialValues, closeHandler } = props;
  const orderContext = useOrderContext();
  const [formState, inputHandler] = useForm({}, true);
  const [orderItems, setOrderItems] = useState(dealItems);

  const dealSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    orderContext.addToOrder({
      item: orderItems,
      quantity: 1,
      total: deal.total,
      type: 'deal',
    });
    closeHandler();
  };

  return (
    <Modal header="Add to Order" closeHandler={closeHandler}>
      <form
        className="order-form"
        style={{
          overflowY: 'scroll',
          minHeight: 'fitContent',
          maxHeight: '60vh',
        }}
        onSubmit={dealSubmitHandler}
      >
        <fieldset>
          {deal && (
            <>
              {dealItems.map((dealItem, index) => (
                <div key={index}>
                  <legend>{dealItem.name}</legend>
                  <DealItemInputs
                    dealItem={dealItem}
                    id={`${deal._id}`}
                    initialValues={initialValues}
                    inputHandler={inputHandler}
                    orderItems={orderItems}
                    setOrderItems={setOrderItems}
                    // totalHandler={totalHandler}
                  />
                  <hr />
                </div>
              ))}
              <h2>${deal.total.toFixed(2)}</h2>
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
  const menu = useMenuContext();
  const { dealItem, initialValues, inputHandler, orderItems, setOrderItems } =
    props;
  const [menuItem, setMenuItem] = useState<IMenuItem>();
  const [flavor, setFlavor] = useState<TFlavorValue | null>(initialFlavorValue);

  //whenever menuItem changes, update the corresponding orderItem
  useEffect(() => {
    const updateItemState = () => {
      const newItems = orderItems.map((orderItem) => {
        if (orderItem._id === dealItem._id) return dealItem;
        return orderItem;
      });
      setOrderItems(newItems);
    };
    updateItemState();
  }, [dealItem]);

  useEffect(() => {
    if (!menu) return;
    setMenuItem(menu.find((item) => item._id === dealItem._id)!);
  }, [dealItem._id, menu]);

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

  const sizeHandler = (event: any) => {};
  const flavorHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFlavor(event.target.value as TFlavorValue);
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
          initialValue={
            initialValues.find((initialValue) => initialValue.type === 'size')
              ?.value!
          }
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
            initialValues.find((value) => value.type === 'flavor')?.value!
          }
          flavorHandler={flavorHandler}
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
