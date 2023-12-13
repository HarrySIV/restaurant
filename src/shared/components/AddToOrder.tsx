import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { TFlavor, TItemOption, TSize } from '../../types/OptionTypes';
import { IMenuItem } from '../../pages/menu/Menu';

import { useForm } from '../../shared/hooks/form-hook';
import { useOrderContext } from '../../shared/hooks/orderContext/OrderContext';

import { ItemInputs } from './ItemInputs';
import { LoadingSpinner } from '../elements/ui/LoadingSpinner';
import { Button } from '../../shared/elements/form/Button';

import './_AddToOrder.scss';

type TAddToOrderProps = {
  closeHandler: () => void;
  menuItems: IMenuItem[];
  price: number;
  type: 'deal' | 'menu';
};

type TItemToAddProps = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  totalPriceHandler: (quantity: number, itemPrice: number) => void;
  item: IMenuItem;
  type: 'deal' | 'menu';
};

export const AddToOrder = (props: TAddToOrderProps) => {
  const { closeHandler, menuItems, price, type } = props;
  const orderContext = useOrderContext();
  const [totalPrice, setTotalPrice] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [updatedItems, setUpdatedItems] = useState<IMenuItem[] | null>(
    menuItems
  );

  const totalPriceHandler = (quantity: number, itemPrice: number) => {
    if (quantity > 0) {
      if (type === 'menu') setTotalPrice(quantity * itemPrice);
    }
  };

  const itemSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (updatedItems === null) return;
    orderContext.addToOrder({
      items: updatedItems,
      itemID: Math.random(),
      quantity: quantity,
      itemPrice: totalPrice,
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
              totalPriceHandler={totalPriceHandler}
              item={item}
              type={type}
            />
          ))}
        </fieldset>
        <h2>${totalPrice.toFixed(2)}</h2>
        <Button type="submit" text="ADD TO ORDER" onClick={itemSubmitHandler} />
      </form>
    );
};

const ItemToAdd = (props: TItemToAddProps) => {
  const { item, quantity, setQuantity, totalPriceHandler, type } = props;
  const [formState, inputHandler] = useForm({}, true);
  const [updatedItem, setUpdatedItem] = useState(item);
  const [flavorValue, setFlavorValue] = useState(
    item.flavors?.find((flavor) => flavor.checked === true)?.id || null
  );
  const [sizeValue, setSizeValue] = useState(
    item.sizes?.find((size) => size.checked === true)?.id || null
  );
  useEffect(() => {
    // updates all properties to match user inputs
    //need to setUpdatedItem instead of mutating updatedItem directly

    let updatedSizes;
    let updatedOptions;
    let updatedFlavors;

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
        updatedFlavors = updatedItem.flavors?.map((flavor) => {
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
      flavors: updatedFlavors || updatedItem.flavors || [],
      options: updatedOptions || updatedItem.options || [],
      sizes: updatedSizes || updatedItem.sizes || [],
    });
  }, [formState.inputs]);

  useEffect(() => {
    if (flavorValue && item.flavors) {
      setFlavorValue(
        item.flavors.find(
          (flavorValue: TFlavor) => flavorValue.checked === true
        )!.id
      );
    }
    if (sizeValue && item.sizes) {
      setSizeValue(
        item.sizes.find((sizeValue: TSize) => sizeValue.checked === true)!.id
      );
    }
  }, [flavorValue, item.flavors, sizeValue, item.sizes]);

  return (
    <>
      {updatedItem && (
        <div key={updatedItem._id}>
          <legend>{updatedItem.name}</legend>
          <ItemInputs
            id={`${updatedItem._id}`}
            updatedItem={updatedItem}
            setUpdatedItem={setUpdatedItem}
            inputHandler={inputHandler}
            totalHandler={totalPriceHandler}
            initialFlavorValue={flavorValue}
            initialSizeValue={sizeValue}
            quantity={quantity}
            setQuantity={setQuantity}
            disabled={type === 'deal' ? true : false}
          />
        </div>
      )}
      <hr />
    </>
  );
};
