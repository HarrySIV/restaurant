import { useState } from 'react';
import { MenuItem } from './menu-hook';
import { useHttpClient } from '../http-hook';
import { OrderState } from '../orderContext/orderContext';
import { config } from '../../../config/config';

interface Order {
  customer_name: string;
  phone_number: string;
  _id: string;
  items: MenuItem[];
  total: number;
}

export const useOrder = () => {
  const { sendRequest } = useHttpClient();
  const [orders, setOrders] = useState<Order[]>();
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
        OrderState
      );
      setMessage(responseData.message);
    } catch (error) {}
  };

  return { orders, getOrders, addOrder, message };
};
