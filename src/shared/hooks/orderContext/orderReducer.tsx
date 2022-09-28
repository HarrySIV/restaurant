import { Reducer } from 'react';
import { IOrderContext } from './OrderContext';

export type OrderAction =
  | {
      type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'UPDATE_QUANTITY';
      newOrder: IOrderContext;
    }
  | {
      type: 'CLEAR_ORDER';
      newOrder: IOrderContext;
    }
  | {
      type: 'UPDATE_PRICE';
      total: number;
    };

export const orderReducer: Reducer<IOrderContext, OrderAction> = (
  orderReducerState,
  orderReducerAction
) => {
  switch (orderReducerAction.type) {
    case 'ADD_ITEM':
      return {
        ...orderReducerState,
        items: orderReducerAction.newOrder.items,
      };
    case 'REMOVE_ITEM':
      return {
        ...orderReducerState,
        items: orderReducerAction.newOrder.items,
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
