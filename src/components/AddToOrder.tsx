import { useState, useEffect } from 'react';
import { Modal } from '../shared/elements/uiElements/Modal';
import { Button } from '../shared/elements/formElements/Button';
import { ItemInputs } from '../shared/elements/ItemInputs';
import { useForm } from '../shared/hooks/form-hook';
import { IDeal } from '../shared/hooks/database/deal-hook';
import { useMenu, IMenuItem } from '../shared/hooks/database/menu-hook';

interface IAddToOrderProps {
  closeHandler: () => void;
  deal?: IDeal;
  item?: IMenuItem;
}

export const AddToOrder = (props: IAddToOrderProps) => {
  const { menu } = useMenu();
  const [items, setItems] = useState<IMenuItem[]>([]);

  const { item, deal } = props;
  useEffect(() => {
    if (deal) {
      deal.items.forEach((itemId) => {
        setItems((items) => [...items, menu[itemId]]);
      });
    }
    if (item) {
      setItems([item]);
    }
  }, [menu, item, deal]);
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
    <Modal header="Add to Order" closeHandler={props.closeHandler}>
      <form className="order-form" onSubmit={itemSubmitHandler}>
        <fieldset>
          {/* {items.map((item) => (
            <>
              <legend>{item.name}</legend>
              <ItemInputs id={`${item._id}`} />
              <h2>{item.price}</h2>
            </>
          ))} */}
        </fieldset>
        <Button
          type="submit"
          text="ADD TO ORDER"
          onClick={itemSubmitHandler}
          disabled={!true}
        />
      </form>
    </Modal>
  );
};
