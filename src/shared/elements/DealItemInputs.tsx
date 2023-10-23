import { IDeal } from '../hooks/database/deal-hook';
import { Input } from './formElements/Input';

type DealItemInputsProps = {
  type: 'deal';
  deal: IDeal;
};

export const DealItemInputs = (props: DealItemInputsProps) => {
  const dealQuantity = props.type === 'deal' && {
    pizzas: props.deal.items.filter((item) => item.id === 0).length,
    sodas: props.deal.items.filter((item) => item.id === 3).length,
  };

  return (
    <>
            <Input
        id="quanity"
        element="number"
        type="number"
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
        setQuantity={props.}
        validators={type === 'deal' ? [VALIDATOR_MIN(props.deal.items), VALIDATOR_MAX()] : [VALIDATOR_MIN(1)]}
        errorText="You must add at least 1 item"
        disabled={props.disabled}
      />
    </>
  );
};
