import { useState, Dispatch, SetStateAction } from 'react';

import { IDeal } from '../shared/hooks/database/deal-hook';
import { useForm } from '../shared/hooks/form-hook';
import { useOrderContext } from '../shared/hooks/orderContext/OrderContext';

import { Modal } from '../shared/elements/ui/Modal';
import { Button } from '../shared/elements/form/Button';
import { Input } from '../shared/elements/form/Input';

import { VALIDATOR_MAX, VALIDATOR_MIN } from '../shared/util/validators';

interface IAddDealToOrderProps {
  deal: IDeal;
  closeHandler: () => void;
}

type DealItemInputsProps = {
  deal: IDeal;
  id: string;
  inputHandler: (
    id: string,
    userInputValue: string,
    userInputIsValid: boolean
  ) => void;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  disabled: true;
};

export const AddDealToOrder = (props: IAddDealToOrderProps) => {
  const { deal, closeHandler } = props;
  const orderContext = useOrderContext();
  const [formState, inputHandler] = useForm({}, true);
  const [total, setTotal] = useState(props.deal.total);
  const [quantity, setQuantity] = useState(1);

  const dealSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    orderContext.addToOrder({
      item: deal,
      quantity: 1,
      total: props.deal.total,
    });
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
                  {props.deal.items.map(() => (
                    <DealItemInputs
                      deal={deal}
                      id={`${props.deal._id}`}
                      inputHandler={inputHandler}
                      // totalHandler={totalHandler}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      disabled={true}
                    />
                  ))}

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
  const { deal, inputHandler, setQuantity } = props;

  return (
    <>
      {deal.items.map((item) => (
        <Input
          element="number"
          errorText="You must add at least 1 item"
          id="quanity"
          label="Quantity:"
          onInput={inputHandler}
          initialValue={item.quantity.toString()}
          setQuantity={setQuantity}
          type="number"
          validators={[VALIDATOR_MIN(1), VALIDATOR_MAX(1)]}
          disabled={props.disabled}
        />
      ))}
    </>
  );
};
