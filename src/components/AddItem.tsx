import { Input } from '../shared/FormElements/Input';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import { Modal } from '../shared/UIElements/Modal';
import { VALIDATOR_REQUIRE } from '../shared/util/validators';
import { IMenuItem } from '../shared/hooks/database/menu-hook'; 

export const AddItem = () => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm({
    name: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    },
    price: {
      value: '',
      isValid: false,
    },
    cooking_time: {
      value: '',
      isValid: false,
    },
  });
  const itemSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('price', formState.inputs.price.value);
      formData.append('cooking_time', formState.inputs.cooking_time.value);
    
    }
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
