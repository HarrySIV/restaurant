import React, { createContext, useContext, useReducer, useState } from 'react';
import { IMenuItem } from '../../../pages/menu/Menu';
import { orderReducer } from './orderReducer';

export type TOrderSubmission = GenericOrderSubmisison &
  (
    | {
        item: IMenuItem[];
        type: 'deal';
      }
    | {
        item: IMenuItem;
        type: 'menuItem';
      }
  );

type GenericOrderSubmisison = {
  id: number;
  quantity: number;
  total: number;
};

export interface IOrderContext {
  orderItems: TOrderSubmission[] | null;
  total: number;
  clearOrder: () => void;
  addToOrder: (orderSubmission: TOrderSubmission | null) => void;
  updateItemQuantity: (orderSubmission: TOrderSubmission | null) => void;
  deleteFromOrder: (orderSubmission: TOrderSubmission | null) => void;
  updatePrice: (total: number) => void;
}

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, dispatch] = useReducer(orderReducer, initialOrderState);
  // const [orderItemID, setOrderItemID] = useState(0);
  const [newItemID, setNewItemID] = useState(0);

  const addToOrder = (orderSubmission: TOrderSubmission | null) => {
    if (orderSubmission === null) return;

    const { item, quantity, total, type } = orderSubmission;
    const newItem = { item, quantity, total, type } as TOrderSubmission;
    updatePrice(total);
    dispatch({
      type: 'ADD_ITEM',
      newItem: newItem,
      total: order.total,
      itemID: newItemID,
    });
    setNewItemID((previous) => previous++);
  };

  /* returns new array without item submitted */
  const deleteFromOrder = (orderSubmission: TOrderSubmission | null) => {
    // if (orderSubmission === null) return;
    // if (orderSubmission.type === 'menuItem') {
    //   const { item, total } = orderSubmission;
    //   const updatedOrderItems = order.items.filter(
    //     (orderItem) => orderItem !== null && orderItem.item._id !== item?._id
    //   );
    //   updatePrice(total);
    //   dispatch({
    //     type: 'REMOVE_ITEM',
    //     updatedOrderItems: updatedOrderItems,
    //     total: order.total,
    //   });
    // }
    // if (orderSubmission.type === 'deal') {
    // }
  };

  /* finds item within order and returns new item. current logic is super wrong*/
  const updateItemQuantity = (orderSubmission: TOrderSubmission | null) => {
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
    orderItems: order.orderItems,
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
  orderItems: [],
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
