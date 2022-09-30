import { useState } from 'react';
import { useMenu, IMenuItem } from './database/menu-hook';
import { IDeal } from './database/deal-hook';

export const useModal = () => {
  const { menu } = useMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<IMenuItem[]>([]);

  const openDealOrder = (deal: IDeal) => {
    setIsModalOpen(true);
    deal.items.forEach((itemId) => {
      setItems([...items, menu[itemId]]);
    });
  };

  const openMenuOrder = (item: IMenuItem) => {
    setIsModalOpen(true);
    setItems([item]);
  };

  return { items, isModalOpen, setIsModalOpen, openDealOrder, openMenuOrder };
};
