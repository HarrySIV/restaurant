import React, { useState } from 'react';
import { IDeal } from '../shared/hooks/database/deal-hook';
import { IMenuItem } from '../shared/hooks/database/menu-hook';
import { useOrderContext } from '../shared/hooks/orderContext/OrderContext';

import './_order.scss';

type ItemProps =
  | {
      item: IMenuItem;
      quantity: number;
      total: number;
      type: 'menuItem';
    }
  | {
      deal: IDeal;
      type: 'deal';
    };

export const Order = () => {
  const orderContext = useOrderContext();
  const { items, total } = orderContext;

  if (items.length) {
    return (
      <div className="order-page">
        {total === 0 ? null : <h1>Total: ${total.toFixed(2)}</h1>}
        {items.length ? (
          items.map((item) => item !== null && <Item item={item} />)
        ) : (
          <h1>
            No items have been added to the order. Try ordering from our menu!
          </h1>
        )}
      </div>
    );
  }
};

const Item = (props: ItemProps) => {
  const { item } = props;
  const [displayOptions, setDisplayOptions] = useState(false);
  return (
    <div className="order-line-item-box">
      <h1 className="order-line-item">({item.quantity})</h1>
      {item.item?.sizes ? (
        <h1 className="order-line-item">
          {item.item.sizes.find((size) => size.checked === true)?.value}
        </h1>
      ) : null}
      <h1 className="order-line-item">{item.item?.name}</h1>
      {item.item?.options ? (
        <div className="order-line-item-inner-box">
          <h1
            onMouseEnter={() => setDisplayOptions(true)}
            onMouseLeave={() => setDisplayOptions(false)}
          >
            toppings
          </h1>
          <div className={`options-display ${displayOptions ? 'active' : ''}`}>
            {item.item.options.map((option) =>
              option.checked === true ? <h3>{option.name}</h3> : null
            )}
          </div>
        </div>
      ) : null}
      <h1 className="order-line-item">${item.total.toFixed(2)}</h1>
    </div>
  );
};
