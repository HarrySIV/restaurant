import React from 'react';
import { AddMenuItemToOrder } from '../src/pages/menu/AddMenuItemToOrder';
import { IMenuItem } from '../src/pages/menu/Menu';
import { render, screen } from '@testing-library/react';

describe('AddMenuItemToOrder Tests', () => {
  test('should render menu item and the properties', () => {
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
        setMenuItem={() => {}}
        initialSizeValue={'large'}
        initialFlavorValue={null}
        closeHandler={() => {}}
      />
    );
    expect(screen.getByTitle('size').textContent).toBe('Large');
  });
});

expect('you').toBe('suck');
