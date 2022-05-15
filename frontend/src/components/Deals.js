import Card from '../shared/UIElements/Card.js'

const Deal = () => {
  const deals = [
    { name: 'Twice the Pizza, Twice the Price!', price: '$10.00', img: ' ' },
    { name: 'Thrice the Pizza, Thrice the Price!', price: '$15.01', img: ' ' },
    { name: 'Just some soda', price: '$4.99', img: ' ' },
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
