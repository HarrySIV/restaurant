import { IMenuItem } from '../../pages/menu/Menu';

import { ItemInputs } from './ItemInputs';

type TItemToAddProps = {
  index: number;
  inputHandler: (
    id: string,
    userInputValue: string,
    userInputIsValid: boolean
  ) => void;
  item: IMenuItem;
  totalPriceHandler: (quantity: number, itemPrice: number) => void;
  type: 'deal' | 'menu';
  updateItemHandler: (itemIndex: number, updatedItem: IMenuItem) => void;
};

export const ItemToAdd = (props: TItemToAddProps) => {
  const { item, type, inputHandler } = props;

  return (
    <>
      {item && (
        <>
          <legend>{item.name}</legend>
          <ItemInputs
            disabled={type === 'deal' ? true : false}
            id={`${item._id}`}
            inputHandler={inputHandler}
            updatedItem={item}
          />
        </>
      )}
      <hr />
    </>
  );
};
