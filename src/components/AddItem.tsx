import { Input } from '../shared/FormElements/Input';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import { Modal } from '../shared/UIElements/Modal';
import { VALIDATOR_REQUIRE } from '../shared/util/validators';

export const AddItem = () => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm<menuItem>({
    
  });
  const orderSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Modal>
      <form className="order-form" onSubmit={orderSubmitHandler}>
        <Input
          id="size"
          element="select"
          type="select"
          label="Size"
          onInput={inputHandler}
        />
        <Input
          id="toppings"
          element="select"
          type="select"
          label="Toppings"
          onInput={inputHandler}
        />
      </form>
    </Modal>
  );
};
