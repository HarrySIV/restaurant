import { useEffect, useState } from 'react';
import { useHttpClient } from '../http-hook';
import { config } from '../../../config/config';

export interface IDeal {
  name: string;
  img: string;
  _id: string;
  items: number[];
  total: number;
}

export const useDeal = () => {
  const { sendRequest } = useHttpClient();
  const [deals, setDeals] = useState<IDeal[]>([]);
  const [message, setMessage] = useState<{ message: string }>();

  useEffect(() => {
    const getDeals = async () => {
      try {
        const responseData = await sendRequest(config.api);
        setDeals(responseData.deals);
        setMessage(responseData.message);
      } catch (error) {}
    };
    getDeals();
  }, [sendRequest]);

  return { deals, message };
};
