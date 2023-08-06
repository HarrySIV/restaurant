import React, { useEffect } from 'react';
import { useOrderContext } from '../shared/hooks/orderContext/OrderContext';

export const Order = () => {
  const orderContext = useOrderContext();
  const { items, total } = orderContext;

  useEffect(() => {
    console.log(items);
  }, [items, total]);

  return (
    <>
      {items.length ? (
        items.map((item) => <h1>Ordered</h1>)
      ) : (
        <h1>
          No items have been added to the order. Try ordering from our menu!
        </h1>
      )}
    </>
  );
};
