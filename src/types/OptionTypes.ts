export type TItemOption = {
  name: TToppingValues;
  price: number;
  checked: boolean;
};

export type TToppingValues = 'Pepperoni' | 'Mushroom' | 'Sausage';

export type TFlavorValue =
  | ('pepsi' | 'drpepper' | 'mountaindew')
  | ('sweet' | 'unsweet');

export type TFlavor = (TPepsi | TDrPepper | TMountainDew) | (TSweet | TUnsweet);

type TGenericFlavor = {
  isValid: boolean;
  checked: boolean;
};

type TPepsi = {
  id: 'pepsi';
  value: 'Pepsi';
} & TGenericFlavor;

type TDrPepper = {
  id: 'drpepper';
  value: 'Dr. Pepper';
} & TGenericFlavor;

type TMountainDew = {
  id: 'mountaindew';
  value: 'Mountain Dew';
} & TGenericFlavor;

type TSweet = {
  id: 'sweet';
  value: 'Sweet';
} & TGenericFlavor;

type TUnsweet = {
  id: 'unsweet';
  value: 'Unsweet';
} & TGenericFlavor;

export type TSizeValue = 'small' | 'medium' | 'large';

export type TSize = {
  isValid: boolean;
  checked: boolean;
} & (TSmallSize | TMediumSize | TLargeSize);

type TSmallSize = {
  id: 'small';
  value: 'Small';
  price: 8.99;
  inches: 10;
};

type TMediumSize = {
  id: 'medium';
  value: 'Medium';
  price: 11.99;
  inches: 14;
};

type TLargeSize = {
  id: 'large';
  value: 'Large';
  price: 15.99;
  inches: 16;
};
