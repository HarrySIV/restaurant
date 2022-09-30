import { Button } from '../shared/elements/formElements/Button';
import { ItemInputs } from '../shared/elements/ItemInputs';
import { Modal } from '../shared/elements/uiElements/Modal';
import { useModal } from '../shared/hooks/modal-hook';
import { useForm } from '../shared/hooks/form-hook';

export const AddItem = () => {
  const { items } = useModal();
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
    <Modal header="Add to Order">
      <form className="order-form" onSubmit={itemSubmitHandler}>
        <fieldset>
          {items.map((item) => (
            <>
              <legend>{item.name}</legend>
              <ItemInputs id={`${item._id}`} />
              <h2>{item.price}</h2>
            </>
          ))}
          <Button
            type="submit"
            text="ADD TO ORDER"
            onClick={itemSubmitHandler}
            disabled={!true}
          />
        </fieldset>
      </form>
    </Modal>
  );
};
