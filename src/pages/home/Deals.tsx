import React, { useState } from 'react';
import { useFetch } from '../../shared/hooks/useFetch';
import { IMenuItem } from '../../shared/hooks/database/menu-hook';
import { LoadingSpinner } from '../../shared/elements/ui/LoadingSpinner';
import { AddDealToOrder } from './AddDealToOrder';

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

export const Deals: React.FC = () => {
  const deals = useFetch('/deals', 'deals').data;
  const menu = useFetch('/menu', 'items').data;
  const [selectedDeal, setSelectedDeal] = useState<IDeal>();
  const [dealItems, setDealItems] = useState<IMenuItem[]>();
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<
    { type: string; value: string }[]
  >([]);

  //deals
  const openAddToOrderHandler = (deal: IDeal) => {
    setSelectedDeal(deal);
    const newItems = menu.filter((menuItem) => {
      return deal.items.find((item) => item.id.toString() === menuItem._id);
    });
    newItems.forEach((item) => {
      if (item.flavors) {
        setInitialValues([
          ...initialValues,
          {
            type: 'flavor',
            value:
              item.flavors.find((flavor) => flavor.checked)?.value || 'pepsi',
          },
        ]);
      }

      if (item.sizes) {
        setInitialValues([
          ...initialValues,
          {
            type: 'size',
            value: item.sizes.find((size) => size.checked)?.value || 'medium',
          },
        ]);
      }
    });
    setDealItems(newItems);
    setOpenOrder(true);
  };

  const closeAddToOrderHandler = () => {
    setOpenOrder(false);
    setInitialValues([]);
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
          dealItems={dealItems!}
          initialValues={initialValues}
          closeHandler={closeAddToOrderHandler}
        />
      )}
    </>
  );
};
