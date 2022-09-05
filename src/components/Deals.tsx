import React from 'react';

const Deal: React.FC = () => {
  const deals = [
    {
      name: 'Not a coupon',
      price: '$4.99',
      img: '/assets/images/pepperoni.jpg',
      key: 0,
    },
    {
      name: 'Twice the Pizza, Twice the Price!',
      price: '$10.00',
      img: '/assets/images/twopizzas.jpg',
      key: 1,
    },
    {
      name: 'Thrice the Pizza, Thrice the Price!',
      price: '$15.01',
      img: '/assets/images/threepizzas.jpg',
      key: 2,
    },
    {
      name: 'Just some soda',
      price: '$5.00',
      img: '/assets/images/pepsi.jpg',
      key: 3,
    },
    {
      name: 'Spaghetti',
      price: '$3.99',
      img: '/assets/images/pasta.jpg',
      key: 4,
    },
    {
      name: 'Calzone',
      price: '$4.99',
      img: '/assets/images/calzone.jpg',
      key: 5,
    },
  ];
  return (
    <>
      <h2 className="deal-text">DEALS</h2>
      {deals.map((deal) => (
        <div className="deal" key={deal.key}>
          <img src={deal.img} alt={deal.name} className="deals-img" />
          <div className="deals-backdrop">
            <div className="details">
              <h3 className="add-to-order">ADD TO ORDER</h3>
              <h4 className="deals-text">{deal.name}</h4>
              <h2 className="deals-text">{deal.price}</h2>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Deal;
