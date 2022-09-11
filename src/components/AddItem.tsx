import React, { useState } from 'react';
import { Input } from '../shared/FormElements/Input';

import { LoadingSpinner } from '../shared/UIElements/LoadingSpinner';

const AddItem = () => {
  const [isLoading, setIsLoading] = useState(false);

  const orderSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <form className="order-form" onSubmit={orderSubmitHandler}>
        {isLoading && <LoadingSpinner /* asOverlay*/ />}
      </form>
    </>
  );
};
