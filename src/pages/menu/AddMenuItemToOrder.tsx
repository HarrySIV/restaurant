import React, { useEffect, useState } from 'react';

import { TFlavorValue, TItemOption, TSizeValue } from '../../types/OptionTypes';
import { IMenuItem } from './Menu';

import { useForm } from '../../shared/hooks/form-hook';
import {
  TOrderSubmission,
  useOrderContext,
} from '../../shared/hooks/orderContext/OrderContext';

import { MenuItemInputs } from '../../shared/components/MenuItemInputs';
import { Button } from '../../shared/elements/form/Button';

import '../_AddToOrder.scss';

interface IAddMenuItemToOrderProps {
  closeHandler: () => void;
  initialFlavorValue: TFlavorValue | null;
  initialSizeValue: TSizeValue | null;
  menuItem: IMenuItem;
}

export const AddMenuItemToOrder = (props: IAddMenuItemToOrderProps) => {
  const { closeHandler, initialFlavorValue, initialSizeValue, menuItem } =
    props;
  const orderContext = useOrderContext();
  const [formState, inputHandler] = useForm({}, true);
  const [total, setTotal] = useState(menuItem.price);
  const [quantity, setQuantity] = useState(1);
  const [updatedItem, setUpdatedItem] = useState(menuItem);

  useEffect(() => {
    // updates all properties to match user inputs
    //need to setUpdatedItem instead of mutating updatedItem directly

    let updatedSizes;
    let updatedOptions;

    if (!updatedItem || !updatedItem.sizes) return;

    for (const key in formState.inputs) {
      if (key === 'size') {
        updatedSizes = updatedItem.sizes.map((size) => {
          if (size.id === formState.inputs[key].value) {
            return {
              ...size,
              checked: true,
            };
          } else {
            return {
              ...size,
              checked: false,
            };
          }
        });
      }

      updatedOptions = updatedItem.options.map((topping) => {
        if (key === topping.name) {
          return {
            ...topping,
            checked: formState.inputs[key].checked,
          };
        } else {
          return { ...topping };
        }
      }) as TItemOption[];
    }

    setUpdatedItem({
      ...updatedItem,
      options: updatedOptions || updatedItem.options,
      sizes: updatedSizes || updatedItem.sizes,
    });
  }, [formState.inputs]);

  const totalHandler = (quantity: number, itemPrice: number) => {
    if (quantity > 0) setTotal(quantity * itemPrice);
  };

  const itemSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    orderContext.addToOrder({
      item: updatedItem,
      quantity: quantity,
      total: total,
      type: 'menuItem',
    } as TOrderSubmission);
    setUpdatedItem(menuItem);
    closeHandler();
  };

  return (
    <form
      className="order-form"
      onSubmit={itemSubmitHandler}
      data-testid="addToOrder"
    >
      <fieldset>
        {updatedItem && (
          <div key={updatedItem._id}>
            <legend>{updatedItem.name}</legend>
            <MenuItemInputs
              id={`${updatedItem._id}`}
              updatedItem={updatedItem}
              setUpdatedItem={setUpdatedItem}
              inputHandler={inputHandler}
              totalHandler={totalHandler}
              initialFlavorValue={initialFlavorValue}
              initialSizeValue={initialSizeValue}
              quantity={quantity}
              setQuantity={setQuantity}
              disabled={false}
            />
            <h2>${total.toFixed(2)}</h2>
            <hr />
          </div>
        )}
      </fieldset>
      <Button
        type="submit"
        text="ADD TO ORDER"
        onClick={itemSubmitHandler}
        disabled={!formState.isFormValid}
      />
    </form>
  );
};
