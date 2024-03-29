import React, { useReducer, useEffect, Reducer } from 'react';
import {
  InputProps,
  UserInputActions,
  UserInputState,
} from '../../../types/InputTypes';
import { validate } from '../../util/validators';

import './_input.scss';

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
        // userInputChecked: userInputAction.checked,
        userInputIsTouched: userInputState.userInputIsTouched,
        userInputChecked: userInputAction.userActionChecked,
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
  const [inputReducerState, dispatch] = useReducer(inputReducer, {
    userInputValue: props.initialValue ? props.initialValue : '1',
    userInputIsValid: props.initialValid ? props.initialValid : true,
    userInputIsTouched: false,
    userInputChecked: false,
  });

  /* on input, updates onInput function with input values on change, 
  which really just executes "changeHandler" and dispatches to the reducer */
  const { id, onInput, dataTestID } = props;
  const { userInputValue, userInputIsValid, userInputChecked } =
    inputReducerState;
  useEffect(() => {
    // @ts-ignore
    if (id === 'sizes' || id === 'flavors') onInput(id, userInputValue);
    // @ts-ignore
    if (id === 'quantity') onInput(userInputValue);
    if (id === 'Pepperoni' || id === 'Mushroom' || id === 'Sausage') {
      // @ts-ignore
      onInput(id, userInputChecked);
    }
  }, [id, userInputValue, userInputIsValid, onInput, userInputChecked]);

  //handles input changes and dispatches to inputReducer
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
      userActionChecked: !userInputChecked,
    });
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
      data-testid={dataTestID}
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
      data-testid={dataTestID}
    />
  );
  const checkbox = props.type === 'checkbox' && (
    <>
      <input
        id={props.id}
        type={props.type}
        onChange={changeHandler}
        checked={!!userInputChecked}
        data-testid={dataTestID}
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
      data-testid={dataTestID}
    >
      {props.selection &&
        props.selection.map((selection) => (
          <option
            value={selection.value.toLowerCase()}
            id={selection.id}
            key={selection.id}
          >
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
      data-testid={dataTestID}
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
