import React, { useState } from 'react';
import { IDeal, useDeal } from '../shared/hooks/database/deal-hook';
import { useMenu, IMenuItem } from '../shared/hooks/database/menu-hook';
import { LoadingSpinner } from '../shared/elements/ui/LoadingSpinner';
import { AddDealToOrder } from './AddDealToOrder';

export const Deals: React.FC = () => {
  const { deals } = useDeal();
  const { menu } = useMenu();
  const [selectedDeal, setSelectedDeal] = useState<IDeal>();
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [items, setItems] = useState<IMenuItem[]>([]);

  const openAddToOrderHandler = (deal: IDeal) => {
    setSelectedDeal(deal);
    const dealItems = menu.filter(
      (menuItem) =>
        menuItem._id === deal.items[0].id.toString() ||
        menuItem._id === deal.items[1].id.toString()
    );
    setItems(dealItems);
    setOpenOrder(true);
  };

  const closeAddToOrderHandler = () => {
    setOpenOrder(false);
    setItems([]);
  };

  return (
    <>
      <h2 className="deal-text">DEALS</h2>

      {!deals.length && !menu.length ? (
        <LoadingSpinner />
      ) : (
        deals.map((deal) => (
          <div className="deal" key={deal._id}>
            <img src={deal.img} alt={deal.name} className="deals-img" />
            <div
              className="deals-backdrop"
              onClick={() => openAddToOrderHandler(deal)}
            >
              <div className="details">
                <h3 className="add-to-order">ADD TO ORDER</h3>
                <h4 className="deals-text">{deal.name}</h4>
                <h2 className="deals-text">${deal.total}.00</h2>
              </div>
            </div>
          </div>
        ))
      )}
      {openOrder && selectedDeal && (
        <AddDealToOrder
          deal={selectedDeal}
          closeHandler={closeAddToOrderHandler}
        />
      )}
    </>
  );
};
