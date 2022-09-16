import { useState, useEffect } from 'react';
import { useHttpClient } from '../http-hook';
import { config } from '../../../config/config';

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  _id: number;
  cooking_time: string;
}

export const useMenu = () => {
  const { sendRequest } = useHttpClient();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const getMenu = async () => {
      try {
        const responseData = await sendRequest(`${config.api}/menu`);
        setMenu(responseData.menu);
        setMessage(responseData.message);
      } catch (error) {}
    };
    getMenu();
  }, [sendRequest]);

  return { menu, message };
};
