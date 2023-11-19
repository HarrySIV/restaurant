import React, { useState } from 'react';
import {
  TOrderSubmission,
  useOrderContext,
} from '../../shared/hooks/orderContext/OrderContext';
import { IMenuItem } from '../menu/Menu';

import './_order.scss';

type ElementProps = {
  item: IMenuItem;
  quantity: number;
  total: number;
  type: 'menuItem';
};

type ItemProps = {
  orderItem: TOrderSubmission;
};

export const Order = () => {
  const orderContext = useOrderContext();
  const { orderItems, total } = orderContext;

  if (orderItems === null) {
    <h1>No items have been added to the order. Try ordering from our menu!</h1>;
  } else {
    return (
      <div className="order-page">
        {total === 0 ? null : <h1>Total: ${total.toFixed(2)}</h1>}
        {orderItems.map((orderItem) => {
          return <Item orderItem={orderItem} />;
        })}
      </div>
    );
  }
};

const Item = (props: ItemProps) => {
  const { item, quantity, total, type } = props.orderItem;
  const [displayOptions, setDisplayOptions] = useState(false);

  const element = ({ item, quantity, total }: ElementProps) => (
    <div className="order-line-item-box">
      <h1 className="order-line-item">({quantity})</h1>
      {item.sizes ? (
        <h1 className="order-line-item">
          {item.sizes.find((size) => size.checked === true)?.value}
        </h1>
      ) : null}
      <h1 className="order-line-item">{item.name}</h1>
      {item.options ? (
        <div className="order-line-item-inner-box">
          <h1
            onMouseEnter={() => setDisplayOptions(true)}
            onMouseLeave={() => setDisplayOptions(false)}
          >
            toppings
          </h1>
          <div className={`options-display ${displayOptions ? 'active' : ''}`}>
            {item.options.map((option) =>
              option.checked === true ? <h3>{option.name}</h3> : null
            )}
          </div>
        </div>
      ) : null}
      <h1 className="order-line-item">${total.toFixed(2)}</h1>
    </div>
  );

  if (type === 'menuItem') {
    return element({ item, quantity, total, type });
  }

  return (
    <>
      {item.map((dealItem) => {
        return element({
          item: dealItem,
          quantity: 1,
          total: 0,
          type: 'menuItem',
        });
      })}
    </>
  );
};
