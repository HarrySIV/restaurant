import React, { createContext, useContext, useReducer } from 'react';
import { OrderItem } from '../database/menu-hook';
import { orderReducer, orderInitializer } from './orderReducer';

interface OrderContext {
  order: OrderItem[];
  dispatch: (action: any) => void;
}

const Order = createContext<OrderContext>({
  order: [],
  dispatch: () => [],
});

export const OrderContext = ({ children }: { children: React.ReactNode }) => {
  const [order, dispatch] = useReducer(orderReducer, [], orderInitializer);

  return (
    <Order.Provider value={{ order, dispatch }}>{children}</Order.Provider>
  );
};

export const OrderState = () => {
  return useContext(Order);
};
