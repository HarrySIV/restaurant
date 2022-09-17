import { useState, useEffect } from 'react';
import { useHttpClient } from '../http-hook';
import { environment } from '../../../config/settings';

export interface IMenuItem {
  name: string;
  description: string;
  price: number;
  _id: number;
  cooking_time: string;
}

export const useMenu = () => {
  const { sendRequest } = useHttpClient();
  const [menu, setMenu] = useState<IMenuItem[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const getMenu = async () => {
      try {
        const responseData = await sendRequest(`${environment.api}/menu`);
        setMenu(responseData.items);
        setMessage(responseData.message);
      } catch (error) {}
    };
    getMenu();
  }, [sendRequest]);

  return { menu, message };
};
