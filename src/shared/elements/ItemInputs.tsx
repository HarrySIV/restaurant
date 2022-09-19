import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from '../util/validators';
import { Input } from './FormElements/Input';
import { useForm } from '../hooks/form-hook';

const toppings = [
  { _id: 'pepperoni', value: 'Pepperoni', isValid: true },
  { _id: 'sausage', value: 'Sausage', isValid: true },
  { _id: 'mushrooms', value: 'Mushrooms', isValid: true },
  { _id: 'greenPeppers', value: 'Green Peppers', isValid: true },
  { _id: 'onions', value: 'Onions', isValid: true },
];
const sizes = [
  { _id: 'small', value: 'Small', isValid: true },
  { _id: 'medium', value: 'Medium', isValid: true },
  { _id: 'large', value: 'Large', isValid: true },
];

export const ItemInputs = () => {
  const [formState, inputHandler] = useForm({
    size: {
      value: '',
      isValid: true,
    },
    toppings: {
      value: [],
      isValid: true,
    },
    quantity: {
      value: 1,
      isValid: true,
    },
    id: {
      value: 0,
      isValid: true,
    },
  });
  const hasToppings = true; //delete this later
  const hasSizes = true; //delete this later
  /*
  Type 'FormState 
      | ((id: string, value: string | number, isValid: boolean) => void) 
      | ((inputData: Inputs[], formValidity: boolean) => void)' 
  is not assignable to type 
      '(id: string, value: string | number, isValid: boolean) => 
      { type: string; value: string | number; inputId: string; isValid: boolean; }'
  Type 'FormState' is not assignable to type 
      '(id: string, value: string | number, isValid: boolean) => 
      { type: string; value: string | number; inputId: string; isValid: boolean; }' */
  return (
    <>
      {/*Type 
            'FormState 
            | ((id: string, value: string | number, isValid: boolean) => void) 
            | ((userInputData: Inputs[], formValidity: boolean) => void)' 
          is not assignable to type 
            '(id: string, value: string | number, isValid: boolean) => { type: string; value: string | number; inputId: string; isValid: boolean; }'.
          Type 
            'FormState' is not assignable to type 
              '(id: string, value: string | number, isValid: boolean) => { type: string; value: string | number; inputId: string; isValid: boolean; }'.*/}
      {hasSizes && (
        <Input
          id="size"
          element="select"
          label="Size"
          sizes={sizes}
          onInput={inputHandler}
          hidden={false}
          validators={[VALIDATOR_REQUIRE()]}
        />
      )}
      {hasToppings &&
        toppings.map((topping) => (
          <Input
            id="toppings"
            element="select"
            label={topping.value}
            onInput={inputHandler}
            hidden={false}
            validators={[VALIDATOR_REQUIRE()]}
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
        id="_id"
        element="text"
        type="text"
        label="_id"
        hidden={true}
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
      />
    </>
  );
};
