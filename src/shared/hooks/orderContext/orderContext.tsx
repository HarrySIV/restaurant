import React, { createContext, useContext, useReducer } from 'react';
import { IMenuItem } from '../database/menu-hook';
import { OrderAction, orderReducer } from './orderReducer';

type TOrderSubmission = {
  menuItem: IMenuItem;
  quantity: number;
} | null;

export interface IOrderContext {
  items: { menuItem: IMenuItem; quantity: number }[];
  total: number;
  clearOrder: () => void;
  addToOrder: (orderSubmission: TOrderSubmission) => void;
  updateItemQuantity: (orderSubmission: any) => void;
  deleteFromOrder: (orderSubmission: any) => void;
  updatePrice: (newOrder: any) => void;
}

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, dispatch] = useReducer(orderReducer, initialOrderState);

  const addToOrder = (orderSubmission: TOrderSubmission) => {
    console.log(order);
    if (orderSubmission === null) return;
    const doesOrderItemExist = order.items.filter(
      (orderItem: IMenuItem) =>
        orderSubmission.menuItem._id === orderItem._id &&
        orderSubmission.menuItem.options.forEach((submissionOption: any) =>
          orderItem.options.filter(
            (itemOption) => submissionOption.name === itemOption.name
          ).length > 0
            ? true
            : false
        )
    );
    const newOrder = {
      items: doesOrderItemExist
        ? order.items.map((orderItem: IMenuItem) => {
            if (orderItem._id === orderSubmission.menuItem._id) {
              const newQuantity =
                orderSubmission.quantity + orderSubmission.quantity;
              return {
                menuItem: orderSubmission.menuItem,
                quantity: newQuantity,
              };
            } else return orderItem;
          })
        : [...order.items, orderSubmission],
      total: order.total,
    };
    updatePrice(newOrder);
    dispatch({ type: 'ADD_ITEM', newOrder: newOrder });
  };

  /* returns new array without item submitted */
  const deleteFromOrder = (orderSubmission: TOrderSubmission) => {
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
  const updateItemQuantity = (orderSubmission: TOrderSubmission) => {
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
  const updatePrice = (newOrder) => {
    let total = 0;
    newOrder.items.forEach((item) => (total += item.menuItem.price));
    dispatch({ type: 'UPDATE_PRICE', total: total });
  };

  const value: any = {
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

const initialOrderState = {
  items: [] as any,
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
