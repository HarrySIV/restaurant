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
  console.log(orderReducerState);
  switch (orderReducerAction.type) {
    case 'ADD_ITEM':
      let optionTotal = 0;
      orderReducerAction.newOrder.items.forEach((item) => {
        if (item.menuItem.options.length) {
          item.menuItem.options.forEach(
            (option) => (optionTotal += option.price)
          );
        }
        optionTotal *= item.quantity;
      });
      return {
        ...orderReducerState,
        items: [...orderReducerState.items, orderReducerAction.newOrder.items],
        total:
          orderReducerAction.newOrder.total +
          orderReducerState.total +
          optionTotal,
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
