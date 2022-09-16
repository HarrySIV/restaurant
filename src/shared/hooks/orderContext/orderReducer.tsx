import { IMenuItem } from '../database/menu-hook';

export type OrderAction = { type: string; menuItem: IMenuItem };

export const orderReducer = (state: IMenuItem[], action: OrderAction) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.menuItem];
    case 'DELETE_ITEM':
      return state.forEach((menuItem) => {
        if (action.menuItem._id === menuItem._id) return;
        return menuItem;
      });
    case 'UPDATE_ITEM':
      return state.forEach((menuItem) => {
        if (action.menuItem._id === menuItem._id) return { ...action.menuItem };
        return menuItem;
      });
    case 'CLEAR_ORDER':
      return [];
    default:
      return state;
  }
};

export const orderInitializer = [];
