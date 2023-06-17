import React, { createContext, useContext, useReducer } from 'react';
import { IMenuItem } from '../database/menu-hook';
import { orderReducer } from './orderReducer';

// interface TOrderSubmission {
//   menuItem: IMenuItem;
//   quantity: number;
// }

export interface IOrderContext {
  items: { menuItem: IMenuItem; quantity: number }[];
  total: number;
  clearOrder: () => void;
  addToOrder: (orderSubmission: any) => void;
  updateItemQuantity: (orderSubmission: any) => void;
  deleteFromOrder: (orderSubmission: any) => void;
  updatePrice: (newOrder: any) => void;
}

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, dispatch] = useReducer(orderReducer, initialOrderState);

  // const addToOrder = (orderSubmission: any) => {
  //   /* finds if item exists in order and either adds to existing quantity or adds to order */
  //   const doesOrderItemExist = order.items.filter(
  //     (orderItem) => orderSubmission.menuItem._id === orderItem.menuItem._id
  //   );
  //   const newOrder = {
  //     items: doesOrderItemExist.length
  //       ? order.items.map((orderItem) => {
  //           if (orderItem.menuItem._id === orderSubmission.menuItem._id) {
  //             const newQuantity = orderSubmission.quantity + orderItem.quantity;
  //             return {
  //               menuItem: orderSubmission.menuItem,
  //               quantity: newQuantity,
  //             };
  //           } else return { ...orderItem };
  //         })
  //       : [...order.items, orderSubmission],
  //     total: order.total,
  //   };
  //   updatePrice(newOrder);
  //   dispatch({ type: 'ADD_ITEM', newOrder: newOrder });
  // };

  const addToOrder = (orderSubmission: any) => {
    
    dispatch({ type: 'ADD_ITEM', newOrder: newOrder });
  };

  /* returns new array without item submitted */
  const deleteFromOrder = (orderSubmission) => {
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
  const updateItemQuantity = (orderSubmission) => {
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
  addToOrder: (orderSubmission = null as any) => {},
  updateItemQuantity: (orderSubmission = null as any) => {},
  deleteFromOrder: (orderSubmission = null as any) => {},
  updatePrice: (newOrder = null as any) => {},
};

const OrderContext = createContext<IOrderContext>(initialOrderState);

export const useOrderContext = () => {
  const orderContext = useContext(OrderContext);

  if (orderContext === undefined)
    throw new Error('useOrder must only be used within OrderContext');
  return orderContext;
};
