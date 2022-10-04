import React, { useState } from 'react';
import { IDeal, useDeal } from '../shared/hooks/database/deal-hook';
import { AddToOrder } from './AddToOrder';
import { useMenu, IMenuItem } from '../shared/hooks/database/menu-hook';

export const Deals: React.FC = () => {
  const { deals } = useDeal();
  const { menu } = useMenu();
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [items, setItems] = useState<IMenuItem[]>([]);

  const openHandler = (deal: IDeal) => {
    setOpenOrder(true);
    const dealItems = menu.filter(
      (menuItem) => menuItem._id === deal.items[0] || deal.items[1]
    );
    setItems(dealItems);
  };

  const closeHandler = () => {
    setOpenOrder(false);
    setItems([]);
  };

  return (
    <>
      <h2 className="deal-text">DEALS</h2>
      {deals.map((deal) => (
        <div className="deal" key={deal._id}>
          <img src={deal.img} alt={deal.name} className="deals-img" />
          <div className="deals-backdrop" onClick={() => openHandler(deal)}>
            <div className="details">
              <h3 className="add-to-order">ADD TO ORDER</h3>
              <h4 className="deals-text">{deal.name}</h4>
              <h2 className="deals-text">${deal.total}.00</h2>
            </div>
          </div>
          {openOrder && (
            <AddToOrder items={items} deal={deal} closeHandler={closeHandler} />
          )}
        </div>
      ))}
    </>
  );
};
