import { Reducer } from 'react';
import { IOrderContext, TOrderSubmission } from './OrderContext';

export type OrderAction =
  | {
      type: 'ADD_ITEM';
      newItem: TOrderSubmission;
      total: number;
      itemID: number;
    }
  | { type: 'UPDATE_QUANTITY' }
  | {
      type: 'REMOVE_ITEM';
      updatedOrderItems: TOrderSubmission[];
      total: number;
    }
  | {
      type: 'CLEAR_ORDER';
    }
  | {
      type: 'UPDATE_PRICE';
      total: number;
    };

export const orderReducer: Reducer<IOrderContext, OrderAction> = (
  orderReducerState,
  orderReducerAction
) => {
  if (!orderReducerState.orderItems) return orderReducerState;
  switch (orderReducerAction.type) {
    case 'ADD_ITEM':
      return {
        ...orderReducerState,
        orderItems: [
          ...orderReducerState.orderItems,
          orderReducerAction.newItem,
        ],
        total: orderReducerAction.total + orderReducerState.total,
      };
    case 'REMOVE_ITEM':
      return {
        ...orderReducerState,
        orderItems: orderReducerAction.updatedOrderItems,
        total: orderReducerState.total - orderReducerAction.total,
      };
    // case 'UPDATE_QUANTITY':
    //   if (orderReducerAction.newOrder === null) return;
    //   return {
    //     ...orderReducerState,
    //     items: orderReducerAction.newOrder.item,
    //   };
    case 'CLEAR_ORDER':
      return { ...orderReducerState, items: [], total: 0 };
    case 'UPDATE_PRICE':
      return {
        ...orderReducerState,
        total: orderReducerAction.total,
      };
    default:
      return orderReducerState;
  }
};
