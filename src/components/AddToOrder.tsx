import { ItemInputs } from '../shared/elements/ItemInputs';
import { Modal } from '../shared/elements/UIElements/Modal';

const items = [
  {
    _id: '0',
    name: 'Small pizza',
    description: 'Cheese, bread, red sauce and toppings',
    price: 4.99,
    cooking_time: '8',
  },
  {
    _id: '5',
    name: '2 Litre of soda',
    description: 'Pepsi Products',
    price: 3.99,
    cooking_time: '1',
  },
];

export const AddItem = () => {
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
        <fieldset>
          {items.map((item) => (
            <>
              <legend>{item.name}</legend>
              <ItemInputs id={item._id} name={item.name} price={item.price} />
            </>
          ))}
        </fieldset>
      </form>
    </Modal>
  );
};
