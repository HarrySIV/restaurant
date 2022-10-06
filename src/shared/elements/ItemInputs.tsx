import { VALIDATOR_MIN } from '../util/validators';
import { Input } from './formElements/Input';
import { useForm } from '../hooks/form-hook';

type ItemInputsProps = {
  id: string;
  hasSizes: boolean;
  hasToppings: boolean;
};

const toppings = [
  { id: 'pepperoni', value: 'Pepperoni', isValid: true },
  { id: 'sausage', value: 'Sausage', isValid: true },
  { id: 'mushrooms', value: 'Mushrooms', isValid: true },
  { id: 'greenPeppers', value: 'Green Peppers', isValid: true },
  { id: 'onions', value: 'Onions', isValid: true },
];
const sizes = [
  { id: 'small', value: 'Small', isValid: true },
  { id: 'medium', value: 'Medium', isValid: true },
  { id: 'large', value: 'Large', isValid: true },
];

export const ItemInputs = (props: ItemInputsProps) => {
  const [formState, inputHandler] = useForm({}, true);
  return (
    <>
      {props.hasSizes && (
        <Input
          id="size"
          element="select"
          type="select"
          label="Size"
          sizes={sizes}
          onInput={inputHandler}
          initialValue={sizes[1].value}
          errorText="Please pick a valid size"
        />
      )}
      {props.hasToppings &&
        toppings.map((topping) => (
          <Input
            key={topping.id}
            id={topping.id}
            element="checkbox"
            type="checkbox"
            label={topping.value}
            onInput={inputHandler}
            initialValue={topping.value}
            errorText="Please pick a valid topping"
          />
        ))}
      <Input
        id="quanity"
        element="number"
        type="number"
        label="Quantity"
        onInput={inputHandler}
        initialValue="1"
        validators={[VALIDATOR_MIN(1)]}
        errorText="You must add at least 1 item"
      />
      <Input
        id={props.id}
        element="text"
        type="text"
        label="_id"
        placeholder={props.id}
        onInput={inputHandler}
        initialValue={props.id}
        hidden={true}
        errorText="A valid ID was not passed"
      />
    </>
  );
};
