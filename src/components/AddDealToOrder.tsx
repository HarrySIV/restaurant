import { useState, Dispatch, SetStateAction } from 'react';

import { IDeal } from '../shared/hooks/database/deal-hook';
import { useForm } from '../shared/hooks/form-hook';
import { useOrderContext } from '../shared/hooks/orderContext/OrderContext';

import { Modal } from '../shared/elements/ui/Modal';
import { Button } from '../shared/elements/form/Button';
import { Input } from '../shared/elements/form/Input';

import { VALIDATOR_MIN } from '../shared/util/validators';

interface IAddDealToOrderProps {
  deal: IDeal;
  closeHandler: () => void;
}

type DealItemInputsProps = {
  deal: IDeal;
  id: string;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  type: 'deal';
  disabled: true;
};

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
                  {props.deal.items.map(() => (
                    <DealItemInputs
                      type="deal"
                      id={`${props.deal._id}`}
                      inputHandler={inputHandler}
                      // totalHandler={totalHandler}
                      initialValue={props.initialValue}
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
          onClick={itemSubmitHandler}
          disabled={!formState.isFormValid}
        />
      </form>
    </Modal>
  );
};

const DealItemInputs = (props: DealItemInputsProps) => {
  const { deal, type } = props;
  const dealQuantity = {
    pizzas: deal.items.filter((item) => item.id === 0).length,
    sodas: deal.items.filter((item) => item.id === 3).length,
  };

  return (
    <>
      <Input
        element="number"
        errorText="You must add at least 1 item"
        id="quanity"
        label="Quantity:"
        onInput={props.inputHandler}
        initialValue={
          (dealQuantity &&
            (dealQuantity.pizzas > 0
              ? dealQuantity.pizzas.toString()
              : dealQuantity.sodas > 0
              ? dealQuantity.sodas.toString()
              : '1')) ||
          undefined
        }
        setQuantity={
          dealQuantity.pizzas ? dealQuantity.pizzas : dealQuantity.sodas
        }
        type="number"
        validators={[VALIDATOR_MIN(1)]}
        disabled={props.disabled}
      />
    </>
  );
};
