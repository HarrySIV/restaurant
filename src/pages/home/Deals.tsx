import React, { useState } from 'react';
import { useFetch } from '../../shared/hooks/fetch-hook';
import { IMenuItem } from '../menu/Menu';
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
  const deals: IDeal[] = useFetch('/deals', 'deals').data;
  const menu: IMenuItem[] = useFetch('/menu', 'items').data;
  const [selectedDeal, setSelectedDeal] = useState<IDeal>();
  const [dealItems, setDealItems] = useState<IMenuItem[]>();
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<
    { type: string; value: string }[]
  >([]);

  //deals
  const openAddToOrderHandler = (deal: IDeal) => {
    //get menuItem and add quantity ---needs fixing
    const newItems = menu.filter((menuItem) => {
      return deal.items.find((item) => item.id.toString() === menuItem._id);
    });

    deal.items.forEach((dealItem) => {
      let newItem = menu.find(
        (menuItem) => menuItem._id === dealItem.id.toString()
      );
      newItem = {
        ...newItem,
        id: dealItem.id,
        quantity: dealItem.quantity,
      };
      if (!newItem) throw new Error('Deal item not found in menu');
      if (newItem.flavors) {
        setInitialValues([
          ...initialValues,
          {
            type: 'flavor',
            value:
              newItem.flavors.find((flavor) => flavor.checked)?.value ||
              'pepsi',
          },
        ]);
      }

      if (newItem.sizes) {
        setInitialValues([
          ...initialValues,
          {
            type: 'size',
            value:
              newItem.sizes.find((size) => size.checked)?.value || 'medium',
          },
        ]);
      }

      setDealItems((previous) =>
        previous ? [...previous, newItem] : [newItem]
      );
    });

    setSelectedDeal(deal);
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
