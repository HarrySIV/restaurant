import React from 'react';
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
  key: number;
  orderItem: TOrderSubmission;
};

export const Order = () => {
  const orderContext = useOrderContext();
  const { orderItems, total } = orderContext;

  if (orderItems === null) {
    return (
      <h1>
        No items have been added to the order. Try ordering from our menu!
      </h1>
    );
  }

  return (
    <div className="order-page">
      {total === 0 ? null : <h1>Total: ${total.toFixed(2)}</h1>}
      {orderItems.map((orderItem) => {
        return <Item orderItem={orderItem} key={orderItem.id} />;
      })}
    </div>
  );
};

const Item = (props: ItemProps) => {
  const { item, quantity, total, type } = props.orderItem;

  const element = ({ item, quantity, total }: ElementProps) => (
    <div className="order-line-item-box" key={props.key}>
      <h2 className="order-item-quantity">{quantity}</h2>
      <div className="order-line-item-content">
        {item.sizes ? (
          <h1 className="order-line-item-name">
            {item.sizes.find((size) => size.checked === true)?.value}
            {'  '}{item.name}
          </h1>
        ) : null}
        {item.options ? (
          <div className="order-line-item-inner-box">
            <div>
              <h3>
                {item.options.map((option) =>
                  option.checked === true ? (
                    <span key={option.name}>{option.name + '  '}</span>
                  ) : null
                )}
              </h3>
              <h3>
                {item.flavors?.map((flavor) =>
                  flavor.checked === true ? (
                    <span key={flavor.value}>{flavor.value}</span>
                  ) : null
                )}
              </h3>
            </div>
          </div>
        ) : null}
      </div>
      <h1 className="order-item-price">${total.toFixed(2)}</h1>
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
