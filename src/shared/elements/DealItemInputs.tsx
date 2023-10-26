import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { IDeal } from '../hooks/database/deal-hook';
import { Input } from './formElements/Input';
import { VALIDATOR_MIN } from './../util/validators';

type DealItemInputsProps = {
  deal: IDeal;
  id: string;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  type: 'deal';
  disabled: true;
};

export const DealItemInputs = (props: DealItemInputsProps) => {
  const { deal, type } = props;
  const dealQuantity = {
    pizzas: deal.items.filter((item) => item.id === 0).length,
    sodas: deal.items.filter((item) => item.id === 3).length,
  };

  return (
    <>
      <Input
        element="number"
        errorText="You must add at least 1 item"
        id="quanity"
        label="Quantity:"
        onInput={props.inputHandler}
        initialValue={
          (dealQuantity &&
            (dealQuantity.pizzas > 0
              ? dealQuantity.pizzas.toString()
              : dealQuantity.sodas > 0
              ? dealQuantity.sodas.toString()
              : '1')) ||
          undefined
        }
        setQuantity={
          dealQuantity.pizzas ? dealQuantity.pizzas : dealQuantity.sodas
        }
        type="number"
        validators={[VALIDATOR_MIN(1)]}
        disabled={props.disabled}
      />
    </>
  );
};

/* 
type="menu-item"
id={`${props.menuItem._id}`}
menuItem={props.menuItem}
setMenuItem={props.setMenuItem}
inputHandler={inputHandler}
totalHandler={totalHandler}
initialValue={props.initialValue}
quantity={quantity}
setQuantity={setQuantity}
disabled={false}
*/
