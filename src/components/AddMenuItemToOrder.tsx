import { Dispatch, useState, SetStateAction } from 'react';

import { useForm } from '../shared/hooks/form-hook';
import { useOrderContext } from '../shared/hooks/orderContext/OrderContext';

import { IMenuItem } from '../shared/hooks/database/menu-hook';

import { Modal } from '../shared/elements/uiElements/Modal';
import { Button } from '../shared/elements/formElements/Button';
import { ItemInputs } from '../shared/elements/ItemInputs';

import './_AddToOrder.scss';

interface IAddMenuItemToOrderProps {
  closeHandler: () => void;
  initialValue: string;
  menuItem: IMenuItem;
  setMenuItem: Dispatch<SetStateAction<IMenuItem | null>>;
}

export const AddToOrder = (props: IAddMenuItemToOrderProps) => {
  const orderContext = useOrderContext();
  const [total, setTotal] = useState(props.menuItem.price);
  const [quantity, setQuantity] = useState(1);
  const [formState, inputHandler] = useForm({}, true);

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
              <ItemInputs
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
