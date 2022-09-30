import React, { useState, useEffect } from 'react';
import { Button } from '../shared/elements/formElements/Button';
import { ItemInputs } from '../shared/elements/ItemInputs';
import { Modal } from '../shared/elements/uiElements/Modal';
import { IDeal } from '../shared/hooks/database/deal-hook';
import { IMenuItem } from '../shared/hooks/database/menu-hook';
import { useMenu } from '../shared/hooks/database/menu-hook';

interface AddItemProps {
  deal?: IDeal;
  item?: IMenuItem;
}

export const AddItem = (props: AddItemProps) => {
  const { menu } = useMenu();
  const [items, setItems] = useState<IMenuItem[]>([]);

  const assignItems = () => {
    if (props.deal && props.deal.items) {
      const newItems = props.deal.items.map((dealItemId) => {
        return menu[dealItemId];
      });
      setItems(newItems);
    }

    if (props.item) setItems([props.item]);
    throw new Error('Could not find item...');
  };

  useEffect(() => {
    assignItems();
  }, [props]);

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
              <ItemInputs id={`${item._id}`} />
              <h2>{item.price}</h2>
            </>
          ))}
          {/* <Button
            type="submit"
            text="ADD TO ORDER"
            disabled={!formState.isValid}
          /> */}
        </fieldset>
      </form>
    </Modal>
  );
};
