import React, { useState } from 'react';
import { useDeal } from '../shared/hooks/database/deal-hook';
import { AddToOrder } from './AddToOrder';

export const Deals: React.FC = () => {
  const { deals } = useDeal();
  const [openOrder, setOpenOrder] = useState<boolean>();

  const openHandler = () => {
    setOpenOrder(true);
  };

  const closeHandler = () => {
    setOpenOrder(false);
  };

  return (
    <>
      <h2 className="deal-text">DEALS</h2>
      {deals.length &&
        deals.map((deal) => (
          <div className="deal" key={deal._id}>
            <img src={deal.img} alt={deal.name} className="deals-img" />
            <div className="deals-backdrop" onClick={openHandler}>
              <div className="details">
                <h3 className="add-to-order">ADD TO ORDER</h3>
                <h4 className="deals-text">{deal.name}</h4>
                <h2 className="deals-text">${deal.total}.00</h2>
              </div>
            </div>
            {openOrder && (
              <AddToOrder deal={deal} closeHandler={closeHandler} />
            )}
          </div>
        ))}
    </>
  );
};
