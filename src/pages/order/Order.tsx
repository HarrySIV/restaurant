import { Button } from '../../shared/elements/form/Button';
import { useOrder } from '../../shared/hooks/order-hook';
import { useOrderContext } from '../../shared/hooks/orderContext/OrderContext';
import { IMenuItem } from '../menu/Menu';

import './_order.scss';
import { useState, useEffect } from 'react';

type ItemProps = {
  key: string;
  item: IMenuItem;
};

export const Order = () => {
  const orderContext = useOrderContext();
  const { clearOrder, deleteFromOrder, orderItems, total } = orderContext;
  const { submitOrder } = useOrder();
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderReadyTime, setOrderReadyTime] = useState(5);

  useEffect(() => {
    orderItems?.forEach((orderItem) => {
      orderItem.items.forEach((item) => {
        if (parseInt(item.cooking_time) > orderReadyTime)
          setOrderReadyTime((previous) => parseInt(item.cooking_time));
      });
    });
  }, [orderItems, orderReadyTime]);

  if (orderSubmitted) {
    return (
      <>
        <h1>
          Order Submitted! It will be ready in {orderReadyTime + 2} minutes.
        </h1>
        <h1>Thanks for choosing Not a Restaurant!</h1>
      </>
    );
  }

  if (orderItems === null || orderItems.length < 1) {
    return (
      <h1>
        No items have been added to the order. Try ordering from our menu!
      </h1>
    );
  }

  const submitOrderHandler = async () => {
    await submitOrder();
    setOrderSubmitted(true);
    clearOrder();
  };

  return (
    <div className="order-page">
      {total === 0 ? null : <h1>Total: ${total.toFixed(2)}</h1>}
      {orderItems.map((orderItem) => {
        return (
          <>
            <hr />
            <div className="order-line-item-box">
              <h2 className="order-items-quantity">{orderItem.quantity}x</h2>
              <div className="order-line-items">
                {orderItem.items.map((item, index) => (
                  <Item item={item} key={`${item._id}-${index}`} />
                ))}
              </div>
              <h1 className="order-items-price">
                ${orderItem.itemPrice.toFixed(2)}
              </h1>
              <Button
                text="DELETE"
                onClick={() => deleteFromOrder(orderItem)}
              />
            </div>
          </>
        );
      })}

      <Button text="SUBMIT" onClick={submitOrderHandler} />
    </div>
  );
};

const Item = (props: ItemProps) => {
  const { item } = props;

  return (
    <>
      <div className="order-line-item-content">
        {item.sizes ? (
          <h1 className="order-line-item-name">
            {item.sizes.find((size) => size.checked === true)?.value}
            {'  '}
            {item.name}
          </h1>
        ) : null}
        {item.options ? (
          <div className="order-line-item-inner-box">
            <div>
              <h3>
                {item.options.map((option) => {
                  return option.checked === true ? (
                    <span key={option.name}>{option.name + '  '}</span>
                  ) : null;
                })}
              </h3>
              <h3>
                {item.flavors?.map((flavor) => {
                  return flavor.checked === true ? (
                    <span key={flavor.value}>{flavor.value}</span>
                  ) : null;
                })}
              </h3>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
