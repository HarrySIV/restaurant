import { Reducer } from 'react';
import { IMenuItem } from '../database/menu-hook';
import { IOrderContext } from './OrderContext';

export type OrderAction =
  | {
      type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'UPDATE_QUANTITY';
      orderContext: IOrderContext;
      item: IMenuItem;
    }
  | {
      type: 'CLEAR_ORDER';
      orderContext: IOrderContext;
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
      //if item is in the order, update item quantity in newOrder
      //if item is not in the order, add item to newOrder
      return {
        ...orderReducerState,
        items: orderReducerAction.orderContext.items,
      };
    case 'REMOVE_ITEM':
      //if item is in the order, update item quantity in newOrder to = 0
      return {
        ...orderReducerState,
        items: orderReducerAction.orderContext.items,
      };
    case 'UPDATE_QUANTITY':
      //find item id and set quantity to new quantity
      return {
        ...orderReducerState,
        items: orderReducerAction.orderContext.items,
      };
    case 'CLEAR_ORDER':
      //const newOrder = Object.assign({}, order);
      //newOrder = items: [] and price: 0
      return;
    case 'UPDATE_PRICE':
      return {
        ...orderReducerState,
        total: orderReducerAction.total,
      };
    default:
      return orderReducerState;
  }
  //orderReducerState.forEach(item) if(!item.quantity)  delete from array
};
