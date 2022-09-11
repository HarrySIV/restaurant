import React, { useState, useEffect } from 'react';
import { useDeal, IDeal } from '../shared/hooks/deal-hook';

export const Deals: React.FC = () => {
  const { retrievedData, getDeals } = useDeal();
  const [deals, setDeals] = useState<IDeal[]>([]);

  // //gets menu items using menu-hook
  useEffect(() => {
    if (!retrievedData.length) getDeals();
    else setDeals(retrievedData);
  }, [retrievedData, getDeals]);

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
