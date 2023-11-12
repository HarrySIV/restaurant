import { useEffect, useState } from 'react';
import { useHttpClient } from './http-hook';
import { environment } from './../../config/settings';

export const useFetch = (url: string, dataName: string) => {
  const { sendRequest } = useHttpClient();
  const [data, setData] = useState<any[]>([]);
  const [message, setMessage] = useState<{ message: string }>();

  useEffect(() => {
    const getData = async () => {
      try {
        const responseData = await sendRequest(`${environment.api}${url}`);
        console.log(responseData);
        setData(responseData[`${dataName}`]);
        setMessage(responseData.message);
      } catch (error) {}
    };
    getData();
  }, [sendRequest, url, dataName]);

  return { data, message };
};
