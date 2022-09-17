import { Input } from '../shared/FormElements/Input';
import { useForm } from '../shared/hooks/form-hook';
import { Modal } from '../shared/UIElements/Modal';
import { VALIDATOR_REQUIRE } from '../shared/util/validators';
import { IMenuItem } from '../shared/hooks/database/menu-hook'; 

const toppings = [
  {_id: 0, value: 'Pepperoni', isValid: true},
  {_id: 1, value: 'Sausage', isValid: true},
  {_id: 2, value: 'Mushrooms', isValid: true},
  {_id: 3, value: 'Green Peppers', isValid: true},
  {_id: 4, value: 'Onions', isValid: true},
];

const sizes = [
{_id: 0, value: 'Small', isValid: true}, 
{_id: 0, value: 'Medium', isValid: true}, 
{_id: 0, value: 'Large', isValid: true}
];

export const AddItem = () => {
  const hasToppings = true; //delete this later
  const [formState, inputHandler] = useForm({});

  const itemSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('_id', formState.inputs._id.value);
    } catch(error) {}
  };
  return (
    <Modal>
      <form className="order-form" onSubmit={itemSubmitHandler}>
      {hasToppings ? toppings.map((topping) => <Input
          id="toppings"
          element="select"
          type="select"
          label={topping}
          onInput={inputHandler}
        />)}
        {hasSizes ? sizes.map((size) => <Input
          id="size"
          element="select"
          type="select"
          label={size}
          onInput={inputHandler}
        />)}
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
