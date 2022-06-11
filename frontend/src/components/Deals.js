const Deal = () => {
  const deals = [
    {
      name: 'Not a coupon',
      price: '$4.99',
      img: '/assets/images/onepizza.jpg',
    },
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
      price: '$5.00',
      img: '/assets/images/pepsi.jpg',
    },
    {
      name: 'Spaghetti',
      price: '$3.99',
      img: '/assets/images/pasta.jpg',
    },
  ];
  return (
    <>
      <h2 className="deals-text">Deals</h2>
      {deals.map((deal) => (
        <div className="deal">
          <img src={deal.img} alt={deal.name} className="deals-img" />
          <h3>{deal.name}</h3>
          <h2>{deal.price}</h2>
        </div>
      ))}
    </>
  );
};

export default Deal;
