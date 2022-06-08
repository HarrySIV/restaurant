

import Card from '../shared/UIElements/Card.js';

const Deal = () => {
  const deals = [
    {
      name: 'Twice the Pizza, Twice the Price!',
      price: '$10.00',
      img: '/assets/images/twopizzas.jpg',
    },
    {
      name: 'Thrice the Pizza, Thrice the Price!',
      price: '$15.01',
      img: '/assets/images/threepizzas.jpg',
    },
    {
      name: 'Just some soda',
      price: '$4.99',
      img: '/assets/images/pepsi.jpg',
    },
  ];
  return (
    <Card>
      {deals.map((deal) => (
        <>
          <img src={deal.img} alt={deal.name} />
          <h3>{deal.name}</h3>
          <h2>{deal.price}</h2>
        </>
      ))}
    </Card>
  );
};

export default Deal;
