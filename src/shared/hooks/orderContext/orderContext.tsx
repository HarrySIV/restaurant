import React, { createContext, useContext, useReducer } from 'react';
import { IMenuItem } from '../database/menu-hook';
import { orderReducer } from './orderReducer';

export type TOrderSubmission = {
  item: IMenuItem;
  quantity: number;
  total: number;
} | null;

export interface IOrderContext {
  items: TOrderSubmission[];
  total: number;
  clearOrder: () => void;
  addToOrder: (orderSubmission: TOrderSubmission) => void;
  updateItemQuantity: (orderSubmission: TOrderSubmission) => void;
  deleteFromOrder: (orderSubmission: TOrderSubmission) => void;
  updatePrice: (total: number) => void;
}

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, dispatch] = useReducer(orderReducer, initialOrderState);

  const addToOrder = (orderSubmission: TOrderSubmission) => {
    if (orderSubmission === null) return;
    const { item, quantity, total } = orderSubmission;

    const newItem = { item, quantity, total };
    updatePrice(total);
    dispatch({ type: 'ADD_ITEM', newItem: newItem, total: order.total });
  };

  /* returns new array without item submitted */
  const deleteFromOrder = (orderSubmission: TOrderSubmission) => {
    if (orderSubmission === null) return;
    const { item, total } = orderSubmission;
    const updatedOrderItems = order.items.filter(
      (orderItem) => orderItem !== null && orderItem.item._id !== item._id
    );
    updatePrice(total);
    dispatch({
      type: 'REMOVE_ITEM',
      updatedOrderItems: updatedOrderItems,
      total: order.total,
    });
  };

  /* finds item within order and returns new item. current logic is super wrong*/
  const updateItemQuantity = (orderSubmission: TOrderSubmission) => {
    // if (orderSubmission === null) return;
    // const { item, total } = orderSubmission;
    // const newOrder = {
    //   items: order.items.map((newOrderItem) => {
    //     if (newOrderItem !== null && newOrderItem.item._id === item._id) {
    //       return orderSubmission;
    //     }
    //     return newOrderItem;
    //   }),
    // };
    // updatePrice(total);
    // dispatch({
    //   type: 'UPDATE_QUANTITY',
    //   newOrder: newOrder,
    //   total: order.total,
    // });
  };

  const clearOrder = () => {
    dispatch({ type: 'CLEAR_ORDER' });
  };

  /* used to update the total after each quantity/item update */
  const updatePrice = (total: number) => {
    dispatch({ type: 'UPDATE_PRICE', total: total });
  };

  const value: IOrderContext = {
    items: order.items,
    total: order.total,
    addToOrder,
    deleteFromOrder,
    updateItemQuantity,
    clearOrder,
    updatePrice,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

const initialOrderState: IOrderContext = {
  items: [],
  total: 0,
  clearOrder: () => {},
  addToOrder: (orderSubmission = null) => {},
  updateItemQuantity: (orderSubmission = null) => {},
  deleteFromOrder: (orderSubmission = null) => {},
  updatePrice: (total = 0) => {},
};

const OrderContext = createContext<IOrderContext>(initialOrderState);

export const useOrderContext = () => {
  const orderContext = useContext(OrderContext);

  if (orderContext === undefined)
    throw new Error('useOrder must only be used within OrderContext');
  return orderContext;
};
