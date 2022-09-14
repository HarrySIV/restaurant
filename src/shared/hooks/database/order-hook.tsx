import { useState } from 'react';
import axios from 'axios';
import { OrderItem } from './menu-hook';

interface Order {
  customer_name: string;
  phone_number: string;
  _id: string;
  items: OrderItem[];
  total: number;
}

export const useOrder = () => {
  const backendURL: string = 'https://localhost:3001/api/orders';
  const [retrievedData, setRetrievedData] = useState<Order[]>();
  const [message, setMessage] = useState<{ message: string }>();

  const getOrders = async () => {
    await axios
      .get(backendURL)
      .then((fetchedData) => {
        setRetrievedData(fetchedData.data.orders);
        setMessage(fetchedData.data.message);
      })
      .catch((error: Error) => console.log(error));
  };

  const addItemToOrder = async () => {
    try {
      await sendRequest( `${backendURL}/orders`, 'POST', JSON.stringify({
        customer_name
      }))
    }
  }

  return { retrievedData, getOrders, message };
};
