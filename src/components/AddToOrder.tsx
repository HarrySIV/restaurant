import { useState } from 'react';

import { useForm } from '../shared/hooks/form-hook';
import { useOrderContext } from '../shared/hooks/orderContext/OrderContext';

import { IMenuItem } from '../shared/hooks/database/menu-hook';
import { IDeal } from '../shared/hooks/database/deal-hook';

import { Modal } from '../shared/elements/uiElements/Modal';
import { Button } from '../shared/elements/formElements/Button';
import { ItemInputs } from '../shared/elements/ItemInputs';

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
    orderContext.addToOrder({
      ...formState.inputs,
      price: props.deal ? props.deal.total : props.items[0].price,
    });
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
                options={item.options}
                deal={props.deal}
                item={item}
                inputHandler={inputHandler}
                priceHandler={priceHandler}
                hasSizes={item.hasSizes}
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
