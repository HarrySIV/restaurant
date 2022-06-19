import { useState } from 'react';

const MenuItem = () => {
  const [display, setDisplay] = useState(false);

  const itemHandler = () => {
    if (display) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
    console.log(display);
  };

  return (
    <div>
      <button onClick={itemHandler}>Pizza</button>
      <h3 className={display ? 'active' : 'none'}>Cheese, bread, red sauce</h3>
    </div>
  );
};

export default MenuItem;
