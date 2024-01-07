import {
  TFlavor,
  TFlavorValue,
  TItemOption,
  TSize,
  TSizeValue,
} from './OptionTypes';

export type UserInputState = {
  userInputValue: string;
  userInputIsValid: boolean;
  userInputIsTouched: boolean;
  userInputChecked: boolean;
};

export type UserInputActions =
  | {
      type: 'CHANGE';
      userActionValue: string;
      userActionChecked: boolean;
      validators?: { type: string; configVal: number }[] | { type: string }[];
    }
  | { type: 'TOUCH' };

type onSelectionInput = (
  id: 'sizes' | 'flavors',
  userInputValue: TSizeValue | TFlavorValue
) => void;

type onQuantityInput = (userInputValue: string) => void;

type onToppingInput = (
  id: 'Pepperoni' | 'Mushrooms' | 'Sausage',
  checked?: boolean
) => void;

type GenericInputElementProps = {
  id: string;
  element: string;
  label: string;
  errorText: string;
  validators?: { type: string; configVal?: number }[];
  initialValid?: boolean;
  dataTestID: string;
  onInput: onSelectionInput | onQuantityInput | onToppingInput;
};

type TextElementProps = GenericInputElementProps & {
  type: 'text';
  placeholder: string;
  initialValue: string | undefined;
  hidden: boolean;
};
type TextAreaElementProps = GenericInputElementProps & {
  type: 'textArea';
  rows: number;
  initialValue: string | undefined;
  placeholder: string;
};
type NumberElementProps = GenericInputElementProps & {
  type: 'number';
  initialValue: string | 0 | undefined;
  disabled?: boolean;
};
type CheckboxElementProps = GenericInputElementProps & {
  type: 'checkbox';
  option: TItemOption;
  initialValue: string | undefined;
};
type SelectElementProps = GenericInputElementProps & {
  type: 'select';
  selection: TSelection[];
  initialValue: TFlavorValue | TSizeValue;
  disabled?: boolean;
};

type TSelection = TSize | TFlavor;

export type InputProps =
  | TextElementProps
  | TextAreaElementProps
  | NumberElementProps
  | CheckboxElementProps
  | SelectElementProps;
