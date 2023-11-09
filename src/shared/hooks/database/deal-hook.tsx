import { useEffect, useState } from 'react';
import { useHttpClient } from '../http-hook';
import { environment } from '../../../config/settings';

export interface IDeal {
  name: string;
  img: string;
  _id: string;
  items: TItem[];
  total: number;
}

export type TItem = {
  id: number;
  quantity: number;
  size?: string;
};

export const useDeal = () => {
  const { sendRequest } = useHttpClient();
  const [deals, setDeals] = useState<IDeal[]>([]);
  const [message, setMessage] = useState<{ message: string }>();

  useEffect(() => {
    const getDeals = async () => {
      try {
        const responseData = await sendRequest(`${environment.api}/deals`);
        setDeals(responseData.deals);
        setMessage(responseData.message);
      } catch (error) {}
    };
    getDeals();
  }, [sendRequest]);

  return { deals, message };
};
