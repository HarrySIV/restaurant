import { Reducer } from 'react';
import { IOrderContext, TOrderSubmission } from './OrderContext';

export type OrderAction =
  | {
      type: 'ADD_ITEM' | 'UPDATE_QUANTITY';
      newOrder: TOrderSubmission;
      total: number;
    }
  | {
      type: 'REMOVE_ITEM';
      updatedOrderItems: TOrderSubmission[];
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
  switch (orderReducerAction.type) {
    case 'ADD_ITEM':
      if (orderReducerAction.newOrder === null) return;
      return {
        ...orderReducerState,
        items: [...orderReducerState.items, orderReducerAction.newOrder.item],
        total: orderReducerAction.newOrder.total + orderReducerState.total,
      };
    case 'REMOVE_ITEM':
      return {
        ...orderReducerState,
        items: orderReducerAction.updatedOrderItems,
        total: orderReducerState.total - orderReducerAction.total,
      };
    case 'UPDATE_QUANTITY':
      if (orderReducerAction.newOrder === null) return;
      return {
        ...orderReducerState,
        items: orderReducerAction.newOrder.item,
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
