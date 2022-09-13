import { Input } from '../shared/FormElements/Input';

export const AddItem = () => {
  const orderSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <form className="order-form" onSubmit={orderSubmitHandler}>
        <Input />
      </form>
    </>
  );
};
