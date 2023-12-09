import React, { useEffect, useState } from 'react';

import { TItemOption } from '../../types/OptionTypes';
import { IMenuItem } from '../../pages/menu/Menu';

import { useForm } from '../../shared/hooks/form-hook';
import { useOrderContext } from '../../shared/hooks/orderContext/OrderContext';

import { MenuItemInputs } from '../../shared/components/MenuItemInputs';
import { LoadingSpinner } from '../elements/ui/LoadingSpinner';
import { Button } from '../../shared/elements/form/Button';

import '../_AddToOrder.scss';

type TAddToOrderProps = {
  closeHandler: () => void;
  menuItems: IMenuItem[];
  price: number;
  type: 'deal' | 'menu';
};

export const AddToOrder = (props: TAddToOrderProps) => {
  const { closeHandler, menuItems, price, type } = props;
  const orderContext = useOrderContext();
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [updatedItems, setUpdatedItems] = useState<IMenuItem[] | null>(menuItems);

  const totalHandler = (quantity: number, itemPrice: number) => {
    if (quantity > 0) setTotal(quantity * itemPrice);
  };

  const itemSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (updatedItems === null) return;
    orderContext.addToOrder({
      items: updatedItems,
      quantity: quantity,
      total: total,
      type: type,
    });
    setUpdatedItems(null);
    closeHandler();
  };

  if (updatedItems === null) return <LoadingSpinner />;
  else
    return (
      <form
        className="order-form"
        onSubmit={itemSubmitHandler}
        data-testid="addToOrder"
      >
        <fieldset>
          {updatedItems?.map((item) => (
            <ItemToAdd
              quantity={quantity}
              setQuantity={setQuantity}
              item={item}
            />
          ))}
        </fieldset>
        <h2>${total.toFixed(2)}</h2>
        <Button type="submit" text="ADD TO ORDER" onClick={itemSubmitHandler} />
      </form>
    );
};

const ItemToAdd = (props: any) => {
  const { item, type } = props;
  const [formState, inputHandler] = useForm({}, true);
  const [updatedItem, setUpdatedItem] = useState(item);
  useEffect(() => {
    // updates all properties to match user inputs
    //need to setUpdatedItem instead of mutating updatedItem directly

    let updatedSizes;
    let updatedOptions;
    let updatedFlavor;

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

      if (key === 'flavor') {
        updatedFlavor = updatedItem.flavors.map((flavor) => {
          if (flavor.id === formState.inputs[key].value) {
            return {
              ...flavor,
              checked: true,
            };
          } else {
            return {
              ...flavor,
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
      flavors: updatedFlavor || updatedItem.flavor || [],
      options: updatedOptions || updatedItem.options || [],
      sizes: updatedSizes || updatedItem.sizes || [],
    });
  }, [formState.inputs]);

  useEffect(() => {
    if (flavorValue) {
      setFlavorValue(
        flavorSelection.find(
          (selectionValue: TFlavor) => selectionValue.checked === true
        )!.id
      );
    }
    if (sizeValue) {
      setSizeValue(
        sizeSelection.find(
          (selectionValue: TSize) => selectionValue.checked === true
        )!.id
      );
    }
  }, []);

  return (
    <>
      {updatedItem && (
        <div key={updatedItem._id}>
          <legend>{updatedItem.name}</legend>
          <MenuItemInputs
            id={`${updatedItem._id}`}
            updatedItem={updatedItem}
            setUpdatedItem={setUpdatedItem}
            inputHandler={inputHandler}
            totalHandler={totalHandler}
            initialFlavorValue={item.flavors?.length ? item.flavors : null}
            initialSizeValue={item.sizes?.length ? item.sizes : null}
            quantity={quantity}
            setQuantity={setQuantity}
            disabled={(type = 'deal' ? true : false)}
          />
        </div>
      )}
      <hr />
    </>
  );
};
