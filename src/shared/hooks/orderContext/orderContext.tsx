import React, { createContext, useContext, useReducer } from 'react';
import { IMenuItem } from '../database/menu-hook';
import { orderReducer } from './orderReducer';

type TOrderSubmission = {
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
  updatePrice: (newOrder: TOrderSubmission) => void;
}

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, dispatch] = useReducer(orderReducer, initialOrderState);

  const addToOrder = (orderSubmission: TOrderSubmission) => {
    if (orderSubmission === null) return;

    const updatedOrder = {
      ...order,
      items: [...order.items, orderSubmission],
    };
    updatePrice(updatedOrder);
    dispatch({ type: 'ADD_ITEM', newOrder: updatedOrder, total: order.total });
  };

  /* returns new array without item submitted */
  const deleteFromOrder = (orderSubmission: TOrderSubmission) => {
    if (orderSubmission === null) return;
    const newOrder = {
      items: order.items.filter(
        (orderItem) =>
          orderItem !== null && orderItem.item._id !== orderSubmission.item._id
      ),
    };
    updatePrice(newOrder);
    dispatch({ type: 'REMOVE_ITEM', newOrder: newOrder, total: order.total });
  };

  /* finds item within order and returns new item */
  const updateItemQuantity = (orderSubmission: TOrderSubmission) => {
    if (orderSubmission === null) return;
    const newOrder = {
      items: order.items.map((newOrderItem) => {
        if (
          newOrderItem !== null &&
          newOrderItem.item._id === orderSubmission.item._id
        ) {
          return orderSubmission;
        }
        return newOrderItem;
      }),
    };
    updatePrice(newOrder);
    dispatch({
      type: 'UPDATE_QUANTITY',
      newOrder: newOrder,
      total: order.total,
    });
  };

  const clearOrder = () => {
    dispatch({ type: 'CLEAR_ORDER', newOrder: { items: [] }, total: 0 });
  };

  /* used to update the total after each quantity/item update */
  const updatePrice = (newOrder: any) => {
    let total = 0;
    newOrder.items.forEach((item: IMenuItem) => (total += item.price));
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
  updatePrice: (newOrder = null) => {},
};

const OrderContext = createContext<IOrderContext>(initialOrderState);

export const useOrderContext = () => {
  const orderContext = useContext(OrderContext);

  if (orderContext === undefined)
    throw new Error('useOrder must only be used within OrderContext');
  return orderContext;
};
