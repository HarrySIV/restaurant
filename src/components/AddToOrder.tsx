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
  item: IMenuItem;
}

export const AddToOrder = (props: IAddToOrderProps) => {
  const orderContext = useOrderContext();
  const [price, setPrice] = useState<number>(props.item.price);
  const [formState, inputHandler] = useForm({}, true);

  const priceHandler = (quantity: number, itemPrice: number) => {
    if (quantity > 0) setPrice(quantity * itemPrice);
  };

  const itemSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    orderContext.addToOrder({
      ...formState.inputs,
      price: props.item?.price,
    });
  };

  return (
    <Modal header="Add to Order" closeHandler={props.closeHandler}>
      <form className="order-form" onSubmit={itemSubmitHandler}>
        <fieldset>
          {props.item && props.initialValue && (
            <div key={props.item._id}>
              <legend>{props.item.name}</legend>
              <ItemInputs
                id={`${props.item._id}`}
                item={props.item}
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
