import { useState, Dispatch, SetStateAction } from 'react';

import { IDeal, TItem } from '../../shared/hooks/database/deal-hook';
import { useForm } from '../../shared/hooks/form-hook';
import { TItemOption, useMenu } from '../../shared/hooks/database/menu-hook';
import { useOrderContext } from '../../shared/hooks/orderContext/OrderContext';

import { Modal } from '../../shared/elements/ui/Modal';
import { Button } from '../../shared/elements/form/Button';
import { Input } from '../../shared/elements/form/Input';

import { VALIDATOR_MIN, VALIDATOR_MAX } from '../../shared/util/validators';

interface IAddDealToOrderProps {
  deal: IDeal;
  initialValues: { type: string; value: string }[];
  closeHandler: () => void;
}

type DealItemInputsProps = {
  dealItem: TItem;
  id: string;
  initialValues: { type: string; value: string }[];
  inputHandler: (
    id: string,
    userInputValue: string,
    userInputIsValid: boolean
  ) => void;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

export const AddDealToOrder = (props: IAddDealToOrderProps) => {
  const { deal, initialValues, closeHandler } = props;
  const orderContext = useOrderContext();
  const [formState, inputHandler] = useForm({}, true);
  const [total, setTotal] = useState(props.deal.total);
  const [quantity, setQuantity] = useState(1);

  const dealSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    orderContext.addToOrder({
      deal: deal,
      type: 'deal',
    });
  };

  return (
    <Modal header="Add to Order" closeHandler={closeHandler}>
      <form className="order-form" onSubmit={dealSubmitHandler}>
        <fieldset>
          {deal && (
            <>
              {deal.items.map((dealItem) => (
                <div key={deal._id}>
                  <legend>{deal.name}</legend>
                  <DealItemInputs
                    dealItem={dealItem}
                    id={`${deal._id}`}
                    initialValues={initialValues}
                    inputHandler={inputHandler}
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
  const { menu } = useMenu();
  const { dealItem, initialValues, inputHandler, setQuantity } = props;
  const [menuItem, setMenuItem] = useState(
    menu.find((item) => item._id === dealItem.id.toString())
  );

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
          initialValue={
            initialValues.find((value) => value.type === 'size')?.value
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
            initialValues.find((value) => value.type === 'flavor')?.value
          }
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
