import React, { useState } from 'react';
import axios from 'axios';

interface Item {
  name: string;
  description: string;
  price: number;
  _id: string;
  cooking_time: string;
}

export const useMenu = () => {
  const backendURL: string = 'https://localhost:3001/api/menu';
  const [retrievedData, setRetrievedData] = useState<Item[]>();
  const [message, setMessage] = useState<{ message: string }>();
};
