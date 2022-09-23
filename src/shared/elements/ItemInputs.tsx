import { VALIDATOR_MIN } from '../util/validators';
import { Input } from './FormElements/Input';
import { useForm } from '../hooks/form-hook';

type ItemInputsProps = {
  errorText?: string;
  id: string;
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
  const [formState, inputHandler] = useForm(
    {
      size: {
        value: '',
        isValid: true,
      },
      toppings: {
        value: '',
        isValid: true,
      },
      quantity: {
        value: 1,
        isValid: true,
      },
      _id: {
        value: 0,
        isValid: true,
      },
    },
    true
  );
  const hasToppings = true; //delete this later
  const hasSizes = true; //delete this later
  return (
    <>
      {hasSizes && (
        <Input
          id="size"
          element="select"
          label="Size"
          sizes={sizes}
          onInput={inputHandler}
          hidden={false}
          errorText={'Please pick a valid size'}
        />
      )}
      {hasToppings &&
        toppings.map((topping) => (
          <Input
            id={topping.id}
            element="checkbox"
            type="checkbox"
            label={topping.value}
            onInput={inputHandler}
            hidden={false}
            errorText={'Please pick a valid topping'}
          />
        ))}
      <Input
        id="quanity"
        element="number"
        type="number"
        label="Quantity"
        onInput={inputHandler}
        hidden={false}
        validators={[VALIDATOR_MIN(1)]}
        errorText="You must add at least 1 item"
      />
      <Input
        id={props.id}
        type="text"
        placeholder={props.id}
        element="text"
        label="_id"
        hidden={true}
        errorText={''}
        onInput={inputHandler}
      />
    </>
  );
};
