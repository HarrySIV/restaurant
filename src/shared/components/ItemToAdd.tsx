import { Dispatch, SetStateAction, useEffect } from 'react';

import { IMenuItem } from '../../pages/menu/Menu';

import { useForm } from '../../shared/hooks/form-hook';
import { ItemInputs } from './ItemInputs';
import { useInputs } from './../hooks/inputs-hook';

type TItemToAddProps = {
  index: number;
  item: IMenuItem;
  setUpdatedItems: Dispatch<SetStateAction<IMenuItem[] | null>>;
  totalPriceHandler: (quantity: number, itemPrice: number) => void;
  type: 'deal' | 'menu';
  updateItemHandler: (itemIndex: number, updatedItem: IMenuItem) => void;
};

export const ItemToAdd = (props: TItemToAddProps) => {
  const { index, item, totalPriceHandler, type, updateItemHandler } = props;
  const [formState, inputHandler] = useForm({}, true);
  const { updatedItem } = useInputs(item, formState.inputs, totalPriceHandler);

  useEffect(() => {
    updateItemHandler(index, updatedItem);
  }, [index, updateItemHandler, updatedItem]);

  return (
    <>
      {updatedItem && (
        <>
          <legend>{updatedItem.name}</legend>
          <ItemInputs
            disabled={type === 'deal' ? true : false}
            id={`${updatedItem._id}`}
            inputHandler={inputHandler}
            updatedItem={updatedItem}
          />
        </>
      )}
      <hr />
    </>
  );
};
