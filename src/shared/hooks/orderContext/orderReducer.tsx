import { IMenuItem } from '../database/menu-hook';

export const orderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.menuItem];
    case 'DELETE_ITEM':
      return state.forEach((menuItem: IMenuItem) => {
        if (action.menuItem.id === menuItem.id) return;
        return menuItem;
      });
    case 'UPDATE_ITEM':
      return state.forEach((menuItem: IMenuItem) => {
        if (action.menuItem.id === menuItem.id) return { ...action.menuItem };
        return menuItem;
      });
    case 'CLEAR_ORDER':
      return [];
    default:
      return state;
  }
};

export const orderInitializer = [];
