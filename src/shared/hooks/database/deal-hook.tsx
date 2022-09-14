import { useState } from 'react';
import { useHttpClient } from '../http-hook';

export interface IDeal {
  name: string;
  img: string;
  _id: string;
  items: number[];
  total: number;
}

export const useDeal = () => {
  const { sendRequest } = useHttpClient();
  const backendURL: string = 'http://localhost:3001/api/deals';
  const [retrievedData, setRetrievedData] = useState<IDeal[]>([]);
  const [message, setMessage] = useState<{ message: string }>();

  const getDeals = async () => {
    try {
      const responseData = await sendRequest(backendURL);
      setRetrievedData(responseData.deals);
      setMessage(responseData.message);
    } catch (error) {}

    return { retrievedData, getDeals, message };
  };
};
