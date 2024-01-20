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
  const { orderItems, total } = useOrderContext();
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

  const submitOrder = async () => {
    const orderBody = JSON.stringify({
      customer_name: 'guest',
      phone_number: '5551234567',
      _id: Math.random().toString(),
      orderItems: orderItems,
      total: total,
    });
    try {
      const responseData = await sendRequest(
        `${environment.testingAPI}/orders`,
        'POST',
        orderBody,
        { 'Content-type': 'application/json' }
      );
      setMessage(responseData.message);
    } catch (error) {}
  };

  return { orders, submitOrder, message };
};
