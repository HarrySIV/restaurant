import { useState } from 'react';

import { useForm } from '../shared/hooks/form-hook';
import { useOrderContext } from '../shared/hooks/orderContext/OrderContext';

import { IMenuItem } from '../shared/hooks/database/menu-hook';

import { Modal } from '../shared/elements/uiElements/Modal';
import { Button } from '../shared/elements/formElements/Button';
import { ItemInputs } from '../shared/elements/ItemInputs';

import './_AddToOrder.scss';

interface IAddToOrderProps {
  closeHandler: () => void;
  initialValue: string;
  menuItem: IMenuItem;
}

export const AddToOrder = (props: IAddToOrderProps) => {
  const orderContext = useOrderContext();
  const [price, setPrice] = useState<number>(props.menuItem.price);
  const [formState, inputHandler] = useForm({}, true);

  const priceHandler = (quantity: number, itemPrice: number) => {
    if (quantity > 0) setPrice(quantity * itemPrice);
  };

  const itemSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    orderContext.addToOrder({
      ...formState.inputs,
      price: props.menuItem?.price,
    });
  };

  return (
    <Modal header="Add to Order" closeHandler={props.closeHandler}>
      <form className="order-form" onSubmit={itemSubmitHandler}>
        <fieldset>
          {props.menuItem && props.initialValue && (
            <div key={props.menuItem._id}>
              <legend>{props.menuItem.name}</legend>
              <ItemInputs
                id={`${props.menuItem._id}`}
                item={props.menuItem}
                inputHandler={inputHandler}
                priceHandler={priceHandler}
                initialValue={props.initialValue}
                disabled={false}
              />
              <h2>${price.toFixed(2)}</h2>
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
