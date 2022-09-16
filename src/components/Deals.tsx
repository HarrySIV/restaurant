import React from 'react';
import { useDeal } from '../shared/hooks/database/deal-hook';

export const Deals: React.FC = () => {
  const { deals } = useDeal();

  return (
    <>
      {deals.length ? (
        deals.map((deal) => (
          <div className="deal" key={deal._id}>
            <img src={deal.img} alt={deal.name} className="deals-img" />
            <div className="deals-backdrop">
              <div className="details">
                <h3 className="add-to-order">ADD TO ORDER</h3>
                <h4 className="deals-text">{deal.name}</h4>
                <h2 className="deals-text">${deal.total}.00</h2>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
      <h2 className="deal-text">DEALS</h2>
    </>
  );
};
