import { useState } from 'react';
import { LoadingSpinner } from '../../shared/elements/ui/LoadingSpinner';
import { AddDealToOrder, TDealItem } from './AddDealToOrder';
import { useMenuContext } from '../../shared/hooks/menuContext/MenuContext';
import { useFetch } from './../../shared/hooks/fetch-hook';

export interface IDeal {
  name: string;
  img: string;
  _id: string;
  items: TItem[];
  total: number;
}

export type TItem = {
  id: number;
  size?: string;
};

export const Deals = () => {
  const menu = useMenuContext();
  const deals: IDeal[] = useFetch('/deals', 'deals').data;
  const [selectedDeal, setSelectedDeal] = useState<IDeal>();
  const [dealItems, setDealItems] = useState<TDealItem[]>();
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<
    { type: string; value: string }[]
  >([]);

  //deals
  const openAddToOrderHandler = (deal: IDeal) => {
    if (initialValues.length > 0) return;

    deal.items.forEach((dealItem) => {
      let newItem = menu.find(
        (menuItem) => menuItem._id === dealItem.id.toString()
      )!;

      if (newItem.flavors && newItem.flavors.length > 0) {
        setInitialValues((previousValues) => [
          ...previousValues,
          {
            type: 'flavor',
            value:
              newItem.flavors!.find((flavor) => flavor.checked)?.value ||
              'pepsi',
          },
        ]);
      }

      if (newItem.sizes && newItem.sizes.length > 0) {
        setInitialValues((previousValues) => [
          ...previousValues,
          {
            type: 'size',
            value: dealItem.size || 'medium',
          },
        ]);
      }
      setDealItems((previous) =>
        previous ? [...previous, newItem!] : [newItem!]
      );
    });

    setSelectedDeal(deal);
    setOpenOrder(true);
  };

  const closeAddToOrderHandler = () => {
    setOpenOrder(false);
    setDealItems([]);
    setInitialValues([]);
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
