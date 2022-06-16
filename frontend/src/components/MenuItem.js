import { useState } from 'react';

const MenuItem = () => {
  const [display, setDisplay] = useState(false);

  return (
    <div>
      <h1>this is an item</h1>
      <button onClick={display ? setDisplay(false) : setDisplay(true)}>
        +
      </button>
    </div>
  );
};

export default MenuItem;
