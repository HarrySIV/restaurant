import { useState, useEffect } from 'react';
import axios from 'axios';

export interface OrderItem {
  name: string;
  description: string;
  price: number;
  _id: number;
  cooking_time: string;
}

const fetchMenu = async () => {
  const backendURL: string = 'https://localhost:3001/api/menu';
  try {
    const { data } = await axios.get(backendURL);
    return data.menu;
  } catch (error) {
    return [];
  }
};

export const useMenu = () => {
  const [menu, setMenu] = useState<OrderItem[]>([]);

  useEffect(() => {
    fetchMenu().then((result: OrderItem[]) => setMenu(result));
  }, []);

  return menu;
};