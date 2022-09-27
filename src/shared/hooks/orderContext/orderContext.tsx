import React, { createContext, useContext, useReducer } from 'react';
import { IMenuItem } from '../database/menu-hook';
import { orderReducer } from './orderReducer';

export interface IOrderContext {
  items: { menuItem: IMenuItem; quantity: number }[];
  total: number;
}

const initialOrderState: IOrderContext = { items: [], total: 0 };

const OrderContext = createContext<IOrderContext>(initialOrderState);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, dispatch] = useReducer(orderReducer, initialOrderState);

  const addToOrder = (item: IMenuItem) => {
    const newOrder = Object.assign({}, order);
    const updatedOrder = {}; //idk yet
    //add logic
    updatePrice(updatedOrder);
    dispatch({ type: 'ADD_ITEM', orderContext: newOrder, item: item });
  };

  const deleteFromOrder = (item: IMenuItem) => {
    const newOrder = Object.assign({}, order);
    const updatedOrder = {}; //idk yet
    //delete logic
    updatePrice(updatedOrder);
    dispatch({ type: 'REMOVE_ITEM', orderContext: newOrder, item: item });
  };

  const updateItem = (item: IMenuItem) => {
    const newOrder = Object.assign({}, order);
    const updatedOrder = {}; //idk yet
    //update logic
    updatePrice(updatedOrder);
    dispatch({ type: 'REMOVE_ITEM', orderContext: newOrder, item: item });
  };

  const clearOrder = () => {
    const updatedOrder = {}; //idk yet
    //clear logic
    updatePrice(updatedOrder);
    dispatch({ type: 'CLEAR_ORDER', orderContext: order });
  };

  const updatePrice = (updatedOrder) => {
    let total = 0;
    updatedOrder.items.forEach((item) => (total += item.menuItem.price));
    dispatch({ type: 'UPDATE_PRICE', total: total });
  };

  const value = {
    order: order.items,
    total: order.total,
    addToOrder,
    deleteFromOrder,
    updateItem,
    clearOrder,
    updatePrice,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (context === undefined)
    throw new Error('useOrder must only be used within OrderContext');
  return context;
};
