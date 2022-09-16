import { useState } from 'react';
import { IMenuItem } from './menu-hook';
import { useHttpClient } from '../http-hook';
import { useOrderContext } from '../orderContext/OrderContext';
import { config } from '../../../config/config';

interface IOrder {
  customer_name: string;
  phone_number: string;
  _id: string;
  items: IMenuItem[];
  total: number;
}

export const useOrder = () => {
  const context = useOrderContext();
  const { sendRequest } = useHttpClient();
  const [orders, setOrders] = useState<IOrder[]>();
  const [message, setMessage] = useState<{ message: string }>();

  const getOrders = async () => {
    try {
      const responseData = await sendRequest(`${config.api}/orders`);
      setOrders(responseData.orders);
      setMessage(responseData.message);
    } catch (error) {}
  };
  const addOrder = async () => {
    try {
      const responseData = await sendRequest(
        `${config.api}/orders`,
        'POST',
        context
      );
      setMessage(responseData.message);
    } catch (error) {}
  };

  return { orders, getOrders, addOrder, message };
};
