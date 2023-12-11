import { useState } from 'react';

import { IMenuItem } from './../menu/Menu';

import { useMenuContext } from '../../shared/hooks/menuContext/MenuContext';
import { useFetch } from './../../shared/hooks/fetch-hook';

import { AddToOrder } from '../../shared/components/AddToOrder';

import { LoadingSpinner } from '../../shared/elements/ui/LoadingSpinner';
import { Modal } from '../../shared/elements/ui/Modal';

export type IDeal = {
  name: string;
  img: string;
  _id: string;
  items: TItem[];
  total: number;
};

export type TItem = {
  id: number;
  size?: string;
};

export const Deals = () => {
  const menu = useMenuContext();
  const deals: IDeal[] = useFetch('/deals', 'deals').data;
  const [selectedDeal, setSelectedDeal] = useState<IDeal | null>(null);
  const [dealItems, setDealItems] = useState<IMenuItem[]>();
  const [openOrder, setOpenOrder] = useState<boolean>(false);

  const openAddToOrderHandler = (deal: IDeal) => {
    setSelectedDeal(deal);
    const items = deal.items.map((item) => {
      const newItem = menu.find(
        (menuItem) => menuItem._id === item.id.toString()
      )!;
      return {
        ...newItem,
        sizes: newItem.sizes?.map((size) => {
          if (size.id === item.size) {
            return { ...size, checked: true };
          } else {
            return { ...size, checked: false };
          }
        }),
      };
    });
    setDealItems(items);
    setOpenOrder(true);
  };

  const closeAddToOrderHandler = () => {
    setOpenOrder(false);
    setSelectedDeal(null);
    setDealItems([]);
  };

  return (
    <>
      <h2 className="deal-text">DEALS</h2>

      {!deals.length && !menu.length ? (
        <LoadingSpinner />
      ) : (
        deals.map((deal, index) => (
          <div className="deal" key={index}>
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
        <Modal header="Add to Order" closeHandler={closeAddToOrderHandler}>
          <AddToOrder
            menuItems={dealItems!}
            closeHandler={closeAddToOrderHandler}
            price={selectedDeal.total}
            type="deal"
          />
        </Modal>
      )}
    </>
  );
};
