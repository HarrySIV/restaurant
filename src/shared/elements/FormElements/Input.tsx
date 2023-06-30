import React, { useState, useReducer, useEffect, Reducer } from 'react';
import { TFlavor, TItemOption, TSize } from '../../hooks/database/menu-hook';
import { validate } from '../../util/validators';

import './_input.scss';

interface UserInputState {
  userInputValue: string;
  userInputIsValid: boolean;
  userInputIsTouched: boolean;
}

type UserInputActions =
  | {
      type: 'CHANGE';
      userActionValue: string;
      validators?: { type: string; configVal: number }[] | { type: string }[];
    }
  | { type: 'TOUCH' };

interface GenericInputElementProps {
  id: string;
  element: string;
  label: string;
  errorText: string;
  validators?: { type: string; configVal?: number }[];
  initialValid?: boolean;
  onInput: (
    id: string,
    userInputValue: string,
    userInputIsValid: boolean
  ) => void;
}

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
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  initialValue: string | 0 | undefined;
  disabled?: boolean;
};
type CheckboxElementProps = GenericInputElementProps & {
  type: 'checkbox';
  option: TItemOption;
  optionsHandler: (userOption: TItemOption, isChecked: boolean) => void;
  initialValue: string | undefined;
};
type SelectElementProps = GenericInputElementProps & {
  type: 'select';
  selection: TSelection[];
  initialValue: string;
  disabled?: boolean;
  selectionHandler: (event: any) => void;
};

type TSelection = TSize | TFlavor;

type InputProps =
  | TextElementProps
  | TextAreaElementProps
  | NumberElementProps
  | CheckboxElementProps
  | SelectElementProps;

const inputReducer: Reducer<UserInputState, UserInputActions> = (
  userInputState,
  userInputAction
) => {
  switch (userInputAction.type) {
    /* on input change, determines if input needs to be validated and then returns the input
    and validation */
    case 'CHANGE':
      return {
        ...userInputState,
        userInputValue: userInputAction.userActionValue,
        userInputIsValid:
          userInputAction.validators && userInputAction.validators.length
            ? validate(
                userInputAction.userActionValue,
                userInputAction.validators
              )
            : userInputState.userInputIsValid,
        userInputIsTouched: userInputState.userInputIsTouched,
      };
    case 'TOUCH':
      return {
        ...userInputState,
        userInputIsTouched: true,
      };
    default:
      return userInputState;
  }
};

/* if props.initialValue exists, set it, otherwise check if the type of input is a number and set initial value
to 1 or an empty string. If initial validity is important, set it, otherwise assume the program always
starts a form as valid */
export const Input = (props: InputProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [inputReducerState, dispatch] = useReducer(inputReducer, {
    userInputValue: props.initialValue ? props.initialValue : '1',
    userInputIsValid: props.initialValid ? props.initialValid : true,
    userInputIsTouched: false,
  });

  /* on input, updates onInput function with input values on change, 
  which really just executes "changeHandler" and dispatches to the reducer */
  const { id, onInput } = props;
  const { userInputValue, userInputIsValid } = inputReducerState;
  useEffect(() => {
    onInput(id, userInputValue, userInputIsValid);
  }, [id, userInputValue, userInputIsValid, onInput]);

  //handles input changes and dispatches to inputReducer
  const changeHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (props.type === 'checkbox') {
      props.optionsHandler(props.option, !isChecked);
      setIsChecked(!isChecked);
    } else {
      if (props.type === 'number') {
        props.setQuantity(parseInt(event.target.value));
      }
      if (props.type === 'select') {
        props.selectionHandler(event);
      }
      dispatch({
        type: 'CHANGE',
        userActionValue: event.target.value,
        validators: props.validators,
      });
    }
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  //these are the different input types and their neccesary props
  const text = props.type === 'text' && (
    <input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputReducerState.userInputValue}
      hidden={props.hidden}
    />
  );
  const number = props.type === 'number' && (
    <input
      id={props.id}
      type={props.type}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputReducerState.userInputValue}
      disabled={props.disabled}
      min="1"
    />
  );
  const checkbox = props.type === 'checkbox' && (
    <>
      <input
        id={props.id}
        type={props.type}
        onChange={changeHandler}
        checked={isChecked}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </>
  );
  const select = props.type === 'select' && (
    <select
      id={props.id}
      onChange={changeHandler}
      value={inputReducerState.userInputValue}
      disabled={props.disabled}
    >
      {props.selection &&
        props.selection.map((selection) => (
          <option value={selection.value} id={selection.id} key={selection.id}>
            {selection.value}
          </option>
        ))}
    </select>
  );
  const textArea = props.type === 'textArea' && (
    <textarea
      id={props.id}
      rows={props.rows || 3}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputReducerState.userInputValue}
    />
  );

  return (
    <div
      className={`form-control ${
        !inputReducerState.userInputIsValid &&
        inputReducerState.userInputIsTouched &&
        `form-control--invalid`
      }`}
    >
      <>
        {(props.type === 'text' && !props.hidden) ||
        (props.type !== 'text' && props.type !== 'checkbox') ? (
          <label htmlFor={props.id} className="form-label">
            {props.label}
          </label>
        ) : null}
        {props.type === 'text'
          ? text
          : props.type === 'textArea'
          ? textArea
          : props.type === 'number'
          ? number
          : props.type === 'checkbox'
          ? checkbox
          : props.type === 'select'
          ? select
          : null}
        {!inputReducerState.userInputIsValid &&
          inputReducerState.userInputIsTouched &&
          props.errorText && <p>{props.errorText}</p>}
      </>
    </div>
  );
};
