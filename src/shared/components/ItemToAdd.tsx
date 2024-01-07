import { SetStateAction } from 'react';
import { IMenuItem } from '../../pages/menu/Menu';

import { ItemInputs } from './ItemInputs';

type TItemToAddProps = {
  index: number;
  item: IMenuItem;
  setQuantity: React.Dispatch<SetStateAction<number>>;
  type: 'deal' | 'menu';
  updateItemHandler: (itemIndex: number, updatedItem: IMenuItem) => void;
};

export const ItemToAdd = (props: TItemToAddProps) => {
  const { index, item, setQuantity, type, updateItemHandler } = props;

  return (
    <>
      {item && (
        <>
          <legend>{item.name}</legend>
          <ItemInputs
            disabled={type === 'deal' ? true : false}
            id={`${item._id}`}
            index={index}
            setQuantity={setQuantity}
            item={item}
            updateItemHandler={updateItemHandler}
          />
        </>
      )}
      <hr />
    </>
  );
};
