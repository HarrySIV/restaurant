import { useState } from 'react';

import { IDeal } from '../shared/hooks/database/deal-hook';
import { useOrderContext } from '../shared/hooks/orderContext/OrderContext';
import { useForm } from '../shared/hooks/form-hook';
import { Modal } from '../shared/elements/uiElements/Modal';
import { DealItemInputs } from './../shared/elements/DealItemInputs';
import { Button } from '../shared/elements/formElements/Button';

interface IAddDealToOrderProps {
  deal: IDeal;
  closeHandler: () => void;
}

export const AddDealToOrder = (props: IAddDealToOrderProps) => {
  const orderContext = useOrderContext();
  const [formState, inputHandler] = useForm({}, true);
  const [total, setTotal] = useState(props.deal.total);
  const [quantity, setQuantity] = useState(1);

  const dealSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (props.deal) {
    //   orderContext.addToOrder({
    //     item: props.deal.items,
    //     quantity: 1,
    //     total: props.deal.total,
    //   });
    // }
  };

  return (
    <Modal header="Add to Order" closeHandler={props.closeHandler}>
      <form className="order-form" onSubmit={dealSubmitHandler}>
        <fieldset>
          {props.deal && (
            <>
              {props.deal.items.map((item) => (
                <div key={props.deal._id}>
                  <legend>{props.deal.name}</legend>
                  <DealItemInputs
                    type="deal"
                    id={`${props.deal._id}`}
                    deal={props.deal}
                    inputHandler={inputHandler}
                    // totalHandler={totalHandler}
                    initialValue={props.initialValue}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    disabled={false}
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
          onClick={itemSubmitHandler}
          disabled={!formState.isFormValid}
        />
      </form>
    </Modal>
  );
};
