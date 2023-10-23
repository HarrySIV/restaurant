import { useState } from 'react';

import { IDeal } from '../shared/hooks/database/deal-hook';
import { useOrderContext } from '../shared/hooks/orderContext/OrderContext';
import { useForm } from '../shared/hooks/form-hook';
import { Modal } from '../shared/elements/uiElements/Modal';
import { ItemInputs } from '../shared/elements/MenuItemInputs';

interface IAddDealToOrderProps {
  deal: IDeal;
  closeHandler: () => void;
}

export const AddDealToOrder = (props: IAddDealToOrderProps) => {
  const orderContext = useOrderContext();
  const [total, setTotal] = useState(props.deal.total);
  const [formState, inputHandler] = useForm({}, true);

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
        {props.deal && (
          <div key={props.deal._id}>
            <legend>{props.deal.name}</legend>
            {props.deal.items.map((item) => (
              <ItemInputs
                type="deal"
                id={`${props.deal._id}`}
                deal={props.deal}
                inputHandler={inputHandler}
                // totalHandler={totalHandler}
                initialValue={props.initialValue}
                disabled={false}
              />
            ))}
          </div>
        )}
      </form>
    </Modal>
  );
};
