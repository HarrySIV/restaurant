import { Button } from '../shared/elements/FormElements/Button';
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
    // try {
    //   const formData = new FormData();
    //   formData.append('_id', formState.inputs._id.value);
    //   formData.append('value', formState.inputs.value.value);
    //   formData.append('isValid', formState.inputs.isValid.value);
    // } catch (error) {}
  };
  return (
    <Modal>
      <form className="order-form" onSubmit={itemSubmitHandler}>
        <fieldset>
          {items.map((item) => (
            <>
              <legend>{item.name}</legend>
              <ItemInputs id={item._id} />
              <h2>{item.price}</h2>
            </>
          ))}
          <Button
            type="submit"
            text="ADD TO ORDER"
            disabled={!formState.isValid}
          />
        </fieldset>
      </form>
    </Modal>
  );
};
