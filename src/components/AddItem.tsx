import { Input } from '../shared/FormElements/Input';
import { useForm } from '../shared/hooks/form-hook';
import { Modal } from '../shared/UIElements/Modal';

const toppings = [
  { _id: 0, value: 'Pepperoni', isValid: true },
  { _id: 1, value: 'Sausage', isValid: true },
  { _id: 2, value: 'Mushrooms', isValid: true },
  { _id: 3, value: 'Green Peppers', isValid: true },
  { _id: 4, value: 'Onions', isValid: true },
];
const sizes = [
  { _id: 0, value: 'Small', isValid: true },
  { _id: 1, value: 'Medium', isValid: true },
  { _id: 2, value: 'Large', isValid: true },
];

export const AddItem = () => {
  const hasToppings = true; //delete this later
  const hasSizes = true; //delete this later
  const [formState, inputHandler] = useForm(
    {
      _id: {
        value: '',
        isValid: false,
      },
    },
    []
  );

  const itemSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('_id', formState.inputs._id.value);
      formData.append('value', formState.inputs.value.value);
      formData.append('isValid', formState.inputs.isValid.value);
    } catch (error) {}
  };
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
    <Modal>
      <form className="order-form" onSubmit={itemSubmitHandler}>
        {hasToppings &&
          toppings.map((topping) => (
            <Input
              id="toppings"
              element="select"
              type="select"
              label={topping.value}
              onInput={inputHandler}
            />
          ))}
        {hasSizes && (
          <Input
            id="size"
            element="select"
            type="select"
            label="Size"
            sizes={sizes}
            onInput={inputHandler}
          />
        )}
        <Input
          id="quanity"
          element="number"
          type="number"
          label="Quantity"
          onInput={inputHandler}
        />
      </form>
    </Modal>
  );
};
