import React, { useReducer, useEffect, Reducer } from 'react';
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
      validators?: { type: string; configVal: number }[] | { type: string }[]; // could be wrong
    }
  | { type: 'TOUCH' };

interface GenericInputElementProps {
  id: string;
  element: string;
  label: string;
  errorText: string;
  validators?: { type: string; configVal?: number }[];
  initialValue: string;
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
  hidden: boolean;
};
type TextAreaElementProps = GenericInputElementProps & {
  type: 'textArea';
  rows: number;
  placeholder: string;
};
type NumberElementProps = GenericInputElementProps & {
  type: 'number';
};
type CheckboxElementProps = GenericInputElementProps & {
  type: 'checkbox';
};
type SelectElementProps = GenericInputElementProps & {
  type: 'select';
  sizes: ISizes[];
};

interface ISizes {
  id: string;
  value: string;
  isValid: boolean;
}

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
            : true, // added this to make it work but probably shouldn't
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

export const Input = (props: InputProps) => {
  const [inputReducerState, dispatch] = useReducer(inputReducer, {
    userInputValue: props.initialValue || '',
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

  const changeHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({
      type: 'CHANGE',
      userActionValue: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

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
    />
  );
  const checkbox = props.type === 'checkbox' && (
    <>
      <input
        id={props.id}
        type={props.type}
        onChange={changeHandler}
        value={inputReducerState.userInputValue}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </>
  );
  const select = props.type === 'select' && (
    <select
      id={props.id}
      onChange={changeHandler}
      value={inputReducerState.userInputValue}
    >
      {props.sizes &&
        props.sizes.map((size) => (
          <option value={size.value} id={size.id} key={size.id}>
            {size.value}
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
