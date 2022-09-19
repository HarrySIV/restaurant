import React, { useReducer, useEffect } from 'react';
import { validate } from '../../util/validators.js';

interface UserInputState {
  value: string | number;
  isValid: boolean;
  isTouched: boolean;
}

type InputActions =
  | {
      type: 'CHANGE';
      val: string;
      validators: [{ type: string; val: number }];
    }
  | { type: 'TOUCH'; isTouched: boolean };

interface InputElementProps {
  element: string;
  type: string;
  placeholder?: string;
  id: string;
  label: string;
  rows?: number;
  errorText?: string;
  hidden: boolean;
  sizes?: { _id: string; value: string; isValid: boolean }[];
  validators: [{ type: string; val: number }];
  initialValue?: {
    initialValue: string;
    initialValid: boolean;
  };
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

const inputReducer = (userInputs: UserInputState, action: InputActions) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...userInputs,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...userInputs,
        isTouched: true,
      };
    default:
      return userInputs;
  }
};

export const Input = (props: InputElementProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: false,
    isTouched: props.initialValid || false,
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
          data-attribute={props.hidden ? props.hidden : ''}
        />
      );
    if (props.element === 'number')
      return (
        <input
          id={props.id}
          type={props.type}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          data-attribute={props.hidden ? props.hidden : ''}
        />
      );
    if (props.element === 'checkbox')
      return (
        <input
          id={props.id}
          type={props.type}
          onChange={changeHandler}
          value={inputState.value}
          data-attribute={props.hidden ? props.hidden : ''}
        />
      );
    if (props.element === 'select')
      return (
        <select
          id={props.id}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          data-attribute={props.hidden ? props.hidden : ''}
        >
          {props.sizes &&
            props.sizes.map((size) => (
              <option value={size.value} id={size._id}>
                {size.value}
              </option>
            ))}
        </select>
      );
    if (props.element === 'textarea')
      return (
        <textarea
          id={props.id}
          rows={props.rows}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          data-attribute={props.hidden ? props.hidden : ''}
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
