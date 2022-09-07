import { useState } from 'react';
import axios from 'axios';

export interface Item {
  name: string;
  description: string;
  price: number;
  _id: number;
  cooking_time: string;
}

export const useMenu = () => {
  const backendURL: string = 'http://localhost:3001/api/menu';
  const [retrievedData, setRetrievedData] = useState<Item[]>([]);

  const getMenu = async () => {
    await axios
      .get(backendURL)
      .then((fetchedData) => {
        setRetrievedData(fetchedData.data.items);
      })
      .catch(() => {
        setRetrievedData([]);
      });
  };

  return { getMenu, retrievedData };
};
