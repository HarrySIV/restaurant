import React, { useReducer, useEffect } from 'react';
import { validate } from '../util/validators.js';

interface IState {
  value: string;
  isValid: boolean; //validate(action.val: string?, action.validators: [{ type: string, val: number}])
  isTouched: boolean;
}

interface Actions {
  type: string;
  val: string;
  validators: [{ type: string; val: number }]; //not sure this is correct
  isTouched: boolean;
}

interface props {
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
    value: string,
    isValid: boolean
  ) => { type: string; value: string; inputId: string; isValid: boolean };
}

const inputReducer = (state: IState, action: Actions) => {
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

export const Input = (props: props) => {
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
  ) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value.toString(),
      validators: props.validators,
      isTouched: false,
    });
  };

  const touchHandler = () => {
    dispatch({
      val: inputState.value,
      validators: props.validators,
      isTouched: inputState.isTouched, //added these three values to make it work
      type: 'TOUCH',
    });
  };

  const inputElement =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && `form-control--invalid`
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};
