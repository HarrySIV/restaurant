import React, { useReducer, useEffect } from 'react';
import { validate } from '../util/validators.js';

interface InputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

type InputActions =
  | { type: 'CHANGE'; val: string; validators: [{ type: string; val: number }] }
  | { type: 'TOUCH' };

interface InputProps {
  element: string;
  type: string;
  placeholder: string;
  id: string;
  label: string;
  rows: number;
  errorText: string;
  validators: [{ type: string; val: number }];
  onInput: (
    id: string,
    value: string | number,
    isValid: boolean
  ) => {
    type: string;
    value: string | number;
    inputId: string;
    isValid: boolean;
  };
}

const inputReducer = (state: InputState, action: InputActions) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

export const Input = (props: InputProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value.toString(),
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const inputElement = () => {
    if (props.element === 'input')
      return (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
    if (props.element === 'textarea')
      return (
        <textarea
          id={props.id}
          rows={props.rows}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
    if (props.element === 'checkbox')
      return (
        {toppings.map((topping) => {
          <input
          id={props.id}
          type={props.type}
          onChange={changeHandler}
          onBlur={touchHandler}
        />
        } )}

      );
    if (props.element === 'select')
      return (
        <select
          id={props.id}
          type={props.type}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        >
          {sizes.map((size) => (
            <option value={size}>{size}</option>
          ))}
        </select>
      );
    if (props.element === 'number')
      return (
        <input
          id={props.id}
          type={props.type}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
  };

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && `form-control--invalid`
      }`}
    >
      <>
        <label htmlFor={props.id}>{props.label}</label>
        {inputElement}
        {!inputState.isValid && inputState.isTouched && (
          <p>{props.errorText}</p>
        )}
      </>
    </div>
  );
};
