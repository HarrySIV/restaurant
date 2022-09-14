import { useState } from 'react';
import { OrderItem } from './menu-hook';
import { useHttpClient } from '../http-hook';
import { OrderState } from '../orderContext/orderContext';

interface Order {
  customer_name: string;
  phone_number: string;
  _id: string;
  items: OrderItem[];
  total: number;
}

export const useOrder = () => {
  const { sendRequest } = useHttpClient();
  const backendURL: string = 'https://localhost:3001/api/orders';
  const [retrievedData, setRetrievedData] = useState<Order[]>();
  const [message, setMessage] = useState<{ message: string }>();

  const getOrders = async () => {
    try {
      const responseData = await sendRequest(backendURL);
      setRetrievedData(responseData.orders);
      setMessage(responseData.message);
    } catch (error) {}
  };
  const addOrder = async () => {
    try {
      await sendRequest(`${backendURL}/orders`, 'POST', OrderState);
    } catch (error) {}
  };

  return { retrievedData, getOrders, addOrder, message };
};
