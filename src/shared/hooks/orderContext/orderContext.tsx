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
    /* finds if item exists in order and either adds to existing quantity or adds to order */
    const doesOrderItemExist = order.items.filter(
      (orderItem) => orderSubmission.menuItem._id === orderItem.menuItem._id
    );
    const newOrder = {
      items: doesOrderItemExist.length
        ? order.items.map((orderItem) => {
            if (orderItem.menuItem._id === orderSubmission.menuItem._id) {
              const newQuantity = orderSubmission.quantity + orderItem.quantity;
              return {
                menuItem: orderSubmission.menuItem,
                quantity: newQuantity,
              };
            } else return { ...orderItem };
          })
        : [...order.items, orderSubmission],
      total: order.total,
    };
    updatePrice(newOrder);
    dispatch({ type: 'ADD_ITEM', newOrder: newOrder });
  };

  /* returns new array without item submitted */
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

  /* finds item within order and returns new item */
  const updateItemQuantity = (orderSubmission: OrderSubmission) => {
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
    dispatch({ type: 'UPDATE_QUANTITY', newOrder: newOrder });
  };

  const clearOrder = () => {
    dispatch({ type: 'CLEAR_ORDER', newOrder: { items: [], total: 0 } });
  };

  /* used to update the total after each quantity/item update */
  const updatePrice = (newOrder: IOrderContext) => {
    let total = 0;
    newOrder.items.forEach((item) => (total += item.menuItem.price));
    dispatch({ type: 'UPDATE_PRICE', total: total });
  };

  const value = {
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

export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (context === undefined)
    throw new Error('useOrder must only be used within OrderContext');
  return context;
};
