import React, { createContext, useContext, useReducer } from 'react';
import { IMenuItem } from '../database/menu-hook';
import { orderReducer, orderInitializer } from './orderReducer';

interface OrderContext {
  items: IMenuItem[];
  dispatch: (action: any) => void;
}

const OrderContext = createContext<OrderContext>({
  items: [],
  dispatch: () => [],
});

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, dispatch] = useReducer(orderReducer, [], orderInitializer);

  const addToOrder = (item) => {
    const updatedOrder = order.items.concat(item);
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        order: updatedOrder,
      },
    });
  };

  const deleteFromOrder = (item) => {
    const updatedOrder = order.items.filter(
      (currentItem) => currentItem.id !== item.id
    );
    dispatch({
      type: 'DELETE_ITEM',
      payload: {
        order: updatedOrder,
      },
    });
  };

  const clearOrder = () => {
    dispatch({
      type: 'CLEAR_ORDER',
      payload: {
        order: [],
      },
    });
  };

  const value = {
    order: order.items,
    addToOrder,
    deleteFromOrder,
    clearOrder,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);

  if (context === undefined)
    throw new Error('useOrder must be within OrderContext');
  return context;
};
