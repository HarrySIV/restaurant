import { Reducer } from 'react';
import { IOrderContext } from './OrderContext';

export type OrderAction =
  | {
      type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'UPDATE_QUANTITY';
      newOrder: any;
      total: number;
    }
  | {
      type: 'CLEAR_ORDER';
      newOrder: any;
      total: 0;
    }
  | {
      type: 'UPDATE_PRICE';
      total: number;
    };

export const orderReducer: Reducer<IOrderContext, OrderAction> = (
  orderReducerState,
  orderReducerAction
) => {
  console.log(orderReducerState);
  switch (orderReducerAction.type) {
    case 'ADD_ITEM':
      return {
        ...orderReducerState,
        items: [...orderReducerState.items, orderReducerAction.newOrder.items],
        total: orderReducerAction.newOrder.total + orderReducerState.total,
      };
    case 'REMOVE_ITEM':
      return {
        ...orderReducerState,
        items: orderReducerAction.newOrder.items,
        total: orderReducerState.total - orderReducerAction.total,
      };
    case 'UPDATE_QUANTITY':
      return {
        ...orderReducerState,
        items: orderReducerAction.newOrder.items,
      };
    case 'CLEAR_ORDER':
      return { ...orderReducerAction.newOrder };
    case 'UPDATE_PRICE':
      return {
        ...orderReducerState,
        total: orderReducerAction.total,
      };
    default:
      return orderReducerState;
  }
};
