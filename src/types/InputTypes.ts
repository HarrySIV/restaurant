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
};

export type UserInputActions =
  | {
      type: 'CHANGE';
      userActionValue: string;
      userActionChecked?: boolean;
      validators?: { type: string; configVal: number }[] | { type: string }[];
    }
  | { type: 'TOUCH' };

type GenericInputElementProps = {
  id: string;
  element: string;
  label: string;
  errorText: string;
  validators?: { type: string; configVal?: number }[];
  initialValid?: boolean;
  dataTestID: string;
  onInput: (
    id: string,
    userInputValue: string,
    userInputIsValid: boolean,
    checked?: boolean
  ) => void;
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