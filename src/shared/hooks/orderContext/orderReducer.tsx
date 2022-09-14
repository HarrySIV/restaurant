import { useReducer } from 'react';

const orderInitializer = [];

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.orderItem];
    case 'DELETE_ITEM':
      return state.forEach((orderItem) => {
        if (action.orderItem.id === orderItem.id) return;
        return orderItem;
      });
    case 'UPDATE_ITEM':
      return state.forEach((orderItem) => {
        if (action.orderItem.id === orderItem.id)
          return { ...action.orderItem };
        return orderItem;
      });
    case 'CLEAR_ORDER':
      return [];
    default:
      return state;
  }
};
