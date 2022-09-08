import React, { useReducer } from 'react';
import { validate } from '../util/validators.js';

interface IState {
  value: string;
  isValid: boolean; //validate(action.val: string?, action.validators: [{ type: string, val: number}])
}

type Actions = {
  type: 'CHANGE';
  val: string;
  validators: [boolean]; //not sure this is correct
};

type props = {
  element: string;
  type: string;
  placeholder: string;
  id: string;
  label: string;
  rows: number;
  errorText: string;
  validators: [boolean];
};

const inputReducer = (state: IState, action: Actions) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    default:
      return state;
  }
};

export const Input = (props: props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
  });
  const changeHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value.toString(),
      validators: props.validators,
    });
  };

  const inputElement =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows}
        onChange={changeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && `form-control--invalid`
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
};
