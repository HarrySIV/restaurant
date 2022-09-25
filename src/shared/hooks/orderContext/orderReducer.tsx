import { Reducer } from 'react';
import { IMenuItem } from '../database/menu-hook';

export type OrderAction = { actionType: string; menuItem: IMenuItem };

export const orderReducer: Reducer<IMenuItem[], OrderAction> = (
  orderReducerState,
  orderReducerAction
) => {
  switch (orderReducerAction.actionType) {
    case 'ADD_ITEM':
      return [...orderReducerState, orderReducerAction.menuItem];
    case 'DELETE_ITEM':
      return orderReducerState.forEach((menuItem) => {
        if (orderReducerAction.menuItem._id === menuItem._id) return;
        return menuItem;
      });
    case 'UPDATE_ITEM':
      return orderReducerState.forEach((menuItem) => {
        if (orderReducerAction.menuItem._id === menuItem._id)
          return { ...orderReducerAction.menuItem };
        return menuItem;
      });
    // case 'CLEAR_ORDER':
    //   return [];
    default:
      return orderReducerState;
  }
};

// export const orderInitializer = [];
