import React, { useState } from 'react';
import { IDeal, useDeal } from '../../shared/hooks/database/deal-hook';
import { useMenu } from '../../shared/hooks/database/menu-hook';
import { LoadingSpinner } from '../../shared/elements/ui/LoadingSpinner';
import { AddDealToOrder } from './AddDealToOrder';

export const Deals: React.FC = () => {
  const { deals } = useDeal();
  const { menu } = useMenu();
  const [selectedDeal, setSelectedDeal] = useState<IDeal>();
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<
    { type: string; value: string }[]
  >([]);

  const openAddToOrderHandler = (deal: IDeal) => {
    setSelectedDeal(deal);
    const newItems = menu.filter((menuItem) => {
      return deal.items.map((item) => item.id.toString() === menuItem._id);
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
    setOpenOrder(true);
  };

  /*
    const openAddToOrderHandler = (menuItem: IMenuItem) => {
    setMenuItem(menuItem);
    const selection = menuItem.sizes?.length
      ? menuItem.sizes
      : menuItem.flavors?.length
      ? menuItem.flavors
      : null;
    if (selection?.length)
      setInitialValue(
        selection.find((selectionValue) => selectionValue.checked === true)!
          .value
      );
    setOpenOrder(true);
  }; 
  */

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
          initialValues={initialValues}
          closeHandler={closeAddToOrderHandler}
        />
      )}
    </>
  );
};
