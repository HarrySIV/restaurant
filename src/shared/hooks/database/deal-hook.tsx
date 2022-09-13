import { useState } from 'react';
import axios from 'axios';

export interface IDeal {
  name: string;
  img: string;
  _id: string;
  items: number[];
  total: number;
}

export const useDeal = () => {
  const backendURL: string = 'http://localhost:3001/api/deals';
  const [retrievedData, setRetrievedData] = useState<IDeal[]>([]);
  const [message, setMessage] = useState<{ message: string }>();

  const getDeals = async () => {
    await axios
      .get(backendURL)
      .then((fetchedData) => {
        setRetrievedData(fetchedData.data.deals);
        setMessage(fetchedData.data.message);
      })
      .catch((error: Error) => console.log(error));
  };

  return { retrievedData, getDeals, message };
};
