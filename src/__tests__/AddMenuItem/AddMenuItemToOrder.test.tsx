import { fireEvent, render, screen } from '@testing-library/react';

import { IMenuItem } from '../../pages/menu/Menu';
import { AddMenuItemToOrder } from '../../pages/menu/AddMenuItemToOrder';

describe('AddMenuItemToOrder Tests', () => {
  const menuItem: IMenuItem = {
    _id: '0',
    name: 'Pizza',
    description: 'Cheese, bread, red sauce and toppings',
    price: 11.99,
    cooking_time: '10',
    options: [
      {
        name: 'Pepperoni',
        price: 1,
        checked: false,
      },
      {
        name: 'Sausage',
        price: 1,
        checked: false,
      },
      {
        name: 'Mushroom',
        price: 1,
        checked: false,
      },
    ],
    flavors: [],
    sizes: [
      {
        id: 'small',
        value: 'Small',
        isValid: true,
        price: 8.99,
        inches: 10,
        checked: false,
      },
      {
        id: 'medium',
        value: 'Medium',
        isValid: true,
        price: 11.99,
        inches: 14,
        checked: true,
      },
      {
        id: 'large',
        value: 'Large',
        isValid: true,
        price: 15.99,
        inches: 16,
        checked: false,
      },
    ],
  };

  render(
    <AddMenuItemToOrder
      menuItem={menuItem}
      initialSizeValue={'large'}
      initialFlavorValue={null}
      closeHandler={() => {}}
    />
  );

  const sizeInput = screen.getByTestId('size') as HTMLSelectElement;
  const pepperoniInput = screen.getByTestId('Pepperoni') as HTMLInputElement;
  const quantityInput = screen.getByTestId('quantity') as HTMLInputElement;

  test('selection inputs', () => {
    fireEvent.change(sizeInput, { target: { value: 'small' } });
    expect(sizeInput.value).toBe('small');
    fireEvent.change(sizeInput, { target: { value: '<alert>hi</alert>' } });
    expect(sizeInput.value).toBe('');

    expect(screen.queryByTestId('flavor')).toBeNull();
  });

  test('toppings input', () => {
    expect(pepperoniInput.checked).toBe(false);
    fireEvent.click(pepperoniInput);
    expect(pepperoniInput.checked).toBe(true);
    fireEvent.click(pepperoniInput);
    expect(pepperoniInput.checked).toBe(false);
  });

  test('quantity input', () => {
    fireEvent.change(quantityInput, { target: { value: '2' } });
    expect(quantityInput.value).toBe('2');
  });
});
