import { useState } from 'react';
import axios from 'axios';
import { Item } from './menu-hook';

interface Order {
  customer_name: string;
  phone_number: string;
  _id: string;
  items: Item[];
  total: number;
}

const useOrder = () => {
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

  return { retrievedData, getOrders, message };
};

export default useOrder;
