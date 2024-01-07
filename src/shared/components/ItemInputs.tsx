import { useCallback, SetStateAction, useEffect } from 'react';

import { IMenuItem } from '../../pages/menu/Menu';

import { Input } from '../elements/form/Input';
import { VALIDATOR_MIN } from '../util/validators';
import { useState } from 'react';
import { TToppingValues } from '../../types/OptionTypes';

type ItemInputsProps = {
  disabled?: boolean;
  id: string;
  index: number;
  item: IMenuItem;
  setQuantity: React.Dispatch<SetStateAction<number>>;
  updateItemHandler: (itemIndex: number, updatedItem: IMenuItem) => void;
};

export const ItemInputs = (props: ItemInputsProps) => {
  const { disabled, index, item, setQuantity, updateItemHandler } = props;
  const [updatedItem, setUpdatedItem] = useState(item);

  useEffect(() => {
    updateItemHandler(index, updatedItem);
  }, [index, updateItemHandler, updatedItem]);

  const selectionHandler = useCallback(
    (id: 'sizes' | 'flavors', userInputeValue: string) => {
      if (!item[id]) {
        return;
      }
      setUpdatedItem((oldItem) => {
        return {
          ...oldItem,
          [id]: item[id]!.map((selection) => {
            return {
              ...selection,
              checked:
                userInputeValue.replace(/\s/g, '') === selection.id
                  ? true
                  : false,
            };
          }),
        };
      });

      //update item to reflect new selection value
    },
    [item]
  );

  const quantityHandler = useCallback(
    (userInputeValue: string) => {
      setQuantity(parseInt(userInputeValue));
    },
    [setQuantity]
  );

  const toppingHandler = useCallback((id: TToppingValues, checked: boolean) => {
    setUpdatedItem((oldItem) => {
      return {
        ...oldItem,
        options: oldItem.options.map((option) => {
          return {
            ...option,
            checked: id === option.name ? checked : option.checked,
          };
        }),
      };
    });
  }, []);

  return (
    <>
      {item.sizes && item.sizes.length > 0 && (
        <Input
          id="sizes"
          element="select"
          type="select"
          label="Size:"
          selection={item?.sizes}
          onInput={selectionHandler}
          initialValue={item.sizes?.find((size) => size.checked === true)?.id!}
          errorText="Please pick a valid size"
          disabled={disabled}
          dataTestID="size"
        />
      )}
      {item.flavors && item.flavors.length > 0 && (
        <Input
          id="flavors"
          element="select"
          type="select"
          label="Flavor:"
          selection={item.flavors}
          onInput={selectionHandler}
          initialValue={
            item.flavors?.find((flavor) => flavor.checked === true)?.id!
          }
          errorText="Please pick a valid flavor"
          disabled={false}
          dataTestID="flavor"
        />
      )}
      {item.options.length
        ? item.options.map((option) => (
            <Input
              key={option.name}
              id={option.name}
              element="checkbox"
              type="checkbox"
              label={option.name}
              //@ts-ignore
              onInput={toppingHandler}
              option={option}
              initialValue={option.name}
              errorText="Please pick a valid topping"
              dataTestID={option.name}
            />
          ))
        : null}
      <Input
        id="quantity"
        element="number"
        errorText="You must add at least 1 item"
        initialValue={'1'}
        label="Quantity:"
        onInput={quantityHandler}
        type="number"
        validators={[VALIDATOR_MIN(1)]}
        disabled={disabled}
        dataTestID="quantity"
      />
    </>
  );
};
