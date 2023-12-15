import React, { useCallback, useState } from 'react';

import { TFlavorValue, TSizeValue } from '../../types/OptionTypes';
import { IMenuItem } from '../../pages/menu/Menu';

import { useOrderContext } from '../../shared/hooks/orderContext/OrderContext';

import { ItemToAdd } from './ItemToAdd';

import { LoadingSpinner } from '../elements/ui/LoadingSpinner';
import { Button } from '../../shared/elements/form/Button';

import './_AddToOrder.scss';

type TAddToOrderProps = {
  closeHandler: () => void;
  menuItems: IMenuItem[];
  price: number;
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

  const totalPriceHandler = useCallback(
    (quantity: number, itemPrice: number) => {
      if (quantity > 0 && type === 'menu') {
        setTotalPrice(quantity * itemPrice);
      }
    },
    [type]
  );

  const updateItemSelection = useCallback(
    (
      itemIndex: number,
      selectionType: 'flavors' | 'sizes',
      selectionValue: TFlavorValue | TSizeValue
    ) => {
      if (!updatedItems) return;
      const updatedSelection = updatedItems[itemIndex][selectionType]?.map(
        (selection) => {
          if (selection.id === selectionValue.replace(/\s/g, '')) {
            return {
              ...selection,
              checked: true,
            };
          } else
            return {
              ...selection,
              checked: false,
            };
        }
      );

      setUpdatedItems((prevItems) => {
        if (!prevItems) return null;
        return prevItems.map((updatedItem, index) => {
          if (index === itemIndex) {
            return {
              ...updatedItem,
              [selectionType]: updatedSelection,
            };
          } else
            return {
              ...updatedItem,
            };
        });
      });
    },
    [updatedItems]
  );

  const updateItemTopping = useCallback(
    (
      itemIndex: number,
      toppingValue: 'Pepperoni' | 'Sausage' | 'Mushroom',
      checked: boolean
    ) => {
      if (!updatedItems) return;
      const updatedToppings = updatedItems[itemIndex].options?.map((option) => {
        if (toppingValue === option.name) {
          return { ...option, checked: checked };
        } else
          return {
            ...option,
          };
      });
      setUpdatedItems(
        updatedItems.map((updatedItem, index) => {
          if (index === itemIndex) {
            return {
              ...updatedItem,
              options: updatedToppings,
            };
          } else
            return {
              ...updatedItem,
            };
        })
      );
    },
    [updatedItems]
  );

  const itemSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(updatedItems![0].flavors);
    console.log(updatedItems![0].sizes);
    console.log(updatedItems![0].options);

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
          {updatedItems?.map((item, index) => (
            <ItemToAdd
              index={index}
              item={item}
              setQuantity={setQuantity}
              setUpdatedItems={setUpdatedItems}
              totalPriceHandler={totalPriceHandler}
              type={type}
              updatedItems={updatedItems}
              updateItemSelection={updateItemSelection}
              updateItemTopping={updateItemTopping}
            />
          ))}
        </fieldset>
        <h2>${totalPrice.toFixed(2)}</h2>
        <Button type="submit" text="ADD TO ORDER" onClick={itemSubmitHandler} />
      </form>
    );
};
