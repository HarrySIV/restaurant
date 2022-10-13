import { useState } from 'react';
import { Modal } from '../shared/elements/uiElements/Modal';
import { Button } from '../shared/elements/formElements/Button';
import { ItemInputs } from '../shared/elements/ItemInputs';
import { useForm } from '../shared/hooks/form-hook';
import { useOrderContext } from '../shared/hooks/orderContext/OrderContext';

import { IMenuItem } from '../shared/hooks/database/menu-hook';
import { IDeal } from '../shared/hooks/database/deal-hook';

import './_AddToOrder.scss';

interface IAddToOrderProps {
  closeHandler: () => void;
  items: IMenuItem[];
  deal?: IDeal;
}

export const AddToOrder = (props: IAddToOrderProps) => {
  const orderContext = useOrderContext();
  const [price, setPrice] = useState<number>();
  const [formState, inputHandler] = useForm({}, true);

  const priceHandler = (quantity: number, itemPrice: number) => {
    if (quantity > 0) setPrice(quantity * itemPrice);
  };

  const itemSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);
    try {
      const formData = new FormData();
      if (formState.inputs._id)
        formData.append('_id', formState.inputs.size.value);
      if (formState.inputs.size)
        formData.append('size', formState.inputs.size.value);
      if (formState.inputs.quantity)
        formData.append('quantity', formState.inputs.quantity.value);

      // if (formState.inputs._id)
      //   formData.append('toppings', formState.inputs.toppings.value);
    } catch (error) {
      console.log(error);
    }
    try {
      orderContext.addToOrder(FormData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal header="Add to Order" closeHandler={props.closeHandler}>
      <form className="order-form" onSubmit={itemSubmitHandler}>
        <fieldset>
          {props.items.map((item) => (
            <div key={item._id}>
              <legend>{item.name}</legend>
              <ItemInputs
                id={`${item._id}`}
                hasSizes={item.hasSizes}
                hasToppings={item.hasToppings}
                deal={props.deal}
                item={item}
                inputHandler={inputHandler}
                priceHandler={priceHandler}
                disabled={props.deal ? true : false}
              />
              {!props.deal ? (
                <h2>${price ? price.toFixed(2) : item.price}</h2>
              ) : null}
              <hr />
            </div>
          ))}
          {props.deal ? <h2>${props.deal.total}.00</h2> : null}
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
