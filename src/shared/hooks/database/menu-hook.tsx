import { useState, useEffect } from 'react';
import { useHttpClient } from '../http-hook';
import { environment } from '../../../config/settings';

export type TItemOptions = { name: string; price: number; checked?: boolean }[];

export interface IMenuItem {
  name: string;
  description: string;
  price: number;
  _id: string;
  cooking_time: string;
  options: TItemOptions;
  optionsPrice: number;
  hasSizes: boolean;
  totalPrice: number;
}

export const useMenu = () => {
  const { sendRequest } = useHttpClient();
  const [menu, setMenu] = useState<IMenuItem[]>([]);
  const [message, setMessage] = useState<string>('');

  //sorts incoming menu by id, from lowest to higest
  const sortMenu = (prevItem: IMenuItem, nextItem: IMenuItem) => {
    if (prevItem._id < nextItem._id) {
      return -1;
    }
    if (prevItem._id > nextItem._id) {
      return 1;
    }
  };

  useEffect(() => {
    const getMenu = async () => {
      try {
        const responseData = await sendRequest(`${environment.api}/menu`);
        setMenu(responseData.items.sort(sortMenu));
        setMessage(responseData.message);
      } catch (error) {}
    };
    getMenu();
  }, [sendRequest]);

  return { menu, message };
};
