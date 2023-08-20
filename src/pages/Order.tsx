import React, { useState } from 'react';
import { useOrderContext } from '../shared/hooks/orderContext/OrderContext';

import './_order.scss';

export const Order = () => {
  const orderContext = useOrderContext();
  const { items, total } = orderContext;
  const [displayOptions, setDisplayOptions] = useState(false);

  return (
    <div className="order-page">
      {total === 0 ? null : <h1>Total: ${total.toFixed(2)}</h1>}
      {items.length ? (
        items.map(
          (item) =>
            item !== null && (
              <div className="order-line-item-box">
                <h1 className="order-line-item">({item.quantity})</h1>
                {item.item?.sizes ? (
                  <h1 className="order-line-item">
                    {
                      item.item.sizes.find((size) => size.checked === true)
                        ?.value
                    }
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
                    <div
                      className={`options-display ${
                        displayOptions ? 'active' : ''
                      }`}
                    >
                      {item.item.options.map((option) =>
                        option.checked === true ? <h3>{option.name}</h3> : null
                      )}
                    </div>
                  </div>
                ) : null}
                <h1 className="order-line-item">${item.total.toFixed(2)}</h1>
              </div>
            )
        )
      ) : (
        <h1>
          No items have been added to the order. Try ordering from our menu!
        </h1>
      )}
    </div>
  );
};
