import React, { createContext, useContext, useReducer } from 'react';
import { IMenuItem } from '../database/menu-hook';
import { orderReducer } from './orderReducer';

const OrderContext = createContext<IMenuItem[]>([
  {
    name: '',
    description: '',
    price: 0,
    _id: -1,
    cooking_time: '',
    hasToppings: false,
    hasSizes: false,
  },
]);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, dispatch] = useReducer(orderReducer, []);

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

  // const clearOrder = () => {
  //   dispatch({
  //     type: 'CLEAR_ORDER',
  //     payload: {
  //       order: [],
  //     },
  //   });
  // };

  const value = {
    order: order.items,
    addToOrder,
    deleteFromOrder,
    // clearOrder,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (context === undefined)
    throw new Error('useOrder must be within OrderContext');
  return context;
};
