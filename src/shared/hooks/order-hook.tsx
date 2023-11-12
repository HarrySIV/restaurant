import { useEffect, useState } from 'react';
import { IMenuItem } from '../../pages/menu/Menu';
import { useHttpClient } from './http-hook';
import { useOrderContext } from './orderContext/OrderContext';
import { environment } from '../../config/settings';

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

  useEffect(() => {
    const getOrders = async () => {
      try {
        const responseData = await sendRequest(`${environment.api}/orders`);
        setOrders(responseData.orders);
        setMessage(responseData.message);
      } catch (error) {}
    };
    getOrders();
  }, [sendRequest]);

  const addOrder = async () => {
    try {
      const responseData = await sendRequest(
        `${environment.api}/orders`,
        'POST',
        context
      );
      setMessage(responseData.message);
    } catch (error) {}
  };

  return { orders, addOrder, message };
};
