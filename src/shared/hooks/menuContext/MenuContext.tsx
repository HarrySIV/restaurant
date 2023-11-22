import React, { createContext, useContext } from 'react';
import { IMenuItem } from '../../../pages/menu/Menu';
import { useFetch } from './../fetch-hook';

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const menu: IMenuItem[] = useFetch('/menu', 'items').data;

  const value = menu;
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

const MenuContext = createContext<IMenuItem[]>([]);

export const useMenuContext = () => {
  const menuContext = useContext(MenuContext);

  if (menuContext === undefined)
    throw new Error('useOrder must only be used within OrderContext');
  return menuContext;
};
