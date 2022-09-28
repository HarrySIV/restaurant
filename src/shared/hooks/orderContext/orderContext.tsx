import React, { createContext, useContext, useReducer } from 'react';
import { IMenuItem } from '../database/menu-hook';
import { orderReducer } from './orderReducer';

interface OrderSubmission {
  menuItem: IMenuItem;
  quantity: number;
}

export interface IOrderContext {
  items: { menuItem: IMenuItem; quantity: number }[];
  total: number;
}

const initialOrderState: IOrderContext = { items: [], total: 0 };

const OrderContext = createContext<IOrderContext>(initialOrderState);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, dispatch] = useReducer(orderReducer, initialOrderState);

  const addToOrder = (orderSubmission: OrderSubmission) => {
    const newOrder = Object.assign({}, order);
    const orderItem = newOrder.items.filter(
      (newOrderItem) =>
        orderSubmission.menuItem._id === newOrderItem.menuItem._id
    );
    if (orderItem.length) {
      newOrder.items.forEach((orderItem) => {
        if (orderItem.menuItem._id === orderSubmission.menuItem._id) {
          orderItem.quantity += orderSubmission.quantity;
        }
      });
    } else {
      newOrder.items.push(orderSubmission);
    }
    updatePrice(newOrder);
    dispatch({ type: 'ADD_ITEM', newOrder: newOrder });
  };

  const deleteFromOrder = (orderSubmission: OrderSubmission) => {
    const newOrder = {
      items: order.items.filter(
        (orderItem) => orderItem.menuItem._id !== orderSubmission.menuItem._id
      ),
      total: order.total,
    };
    updatePrice(newOrder);
    dispatch({ type: 'REMOVE_ITEM', newOrder: newOrder });
  };

  const updateItem = (orderSubmission: OrderSubmission) => {
    const newOrder = {
      items: order.items.map((newOrderItem) => {
        if (newOrderItem.menuItem._id === orderSubmission.menuItem._id) {
          return orderSubmission;
        }
        return newOrderItem;
      }),
      total: order.total,
    };
    updatePrice(newOrder);
    dispatch({ type: 'REMOVE_ITEM', newOrder: newOrder });
  };

  const clearOrder = () => {
    dispatch({ type: 'CLEAR_ORDER', newOrder: { items: [], total: 0 } });
  };

  const updatePrice = (updatedOrder: IOrderContext) => {
    let total = 0;
    updatedOrder.items.forEach((item) => (total += item.menuItem.price));
    dispatch({ type: 'UPDATE_PRICE', total: total });
  };

  const value = {
    items: order.items,
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
