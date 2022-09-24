import React, { useReducer, useEffect } from 'react';
import { validate } from '../../util/validators.js';

interface UserInputState {
  // [key: string]: any;
  userInputValue: string;
  isValid: boolean;
  isTouched: boolean;
}

interface ISizes {
  id: string;
  value: string;
  isValid: boolean;
}

type InputActions =
  | {
      type: 'CHANGE';
      userActionValue: string;
      validators?: { type: string; configVal?: number }[]; // could be wrong
    }
  | { type: 'TOUCH' };

interface GenericInputElementProps {
  id: string;
  element: string;
  hidden: boolean;
  label: string;
  errorText: string;
  validators?: { type: string; configVal?: number }[];
  initialValue: string;
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

type TextElementProps = GenericInputElementProps & {
  type: 'text';
  placeholder: string;
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

type InputProps =
  | TextElementProps
  | TextAreaElementProps
  | NumberElementProps
  | CheckboxElementProps
  | SelectElementProps;

const inputReducer = (userInputs: UserInputState, userAction: InputActions) => {
  switch (userAction.type) {
    // {
    //   type: 'CHANGE';
    //   userActionValue: string;
    //   validators?: { type: string; configVal?: number }[]; // could be wrong
    // }
    case 'CHANGE':
      return {
        ...userInputs,
        userInputValue: userAction.userActionValue,
        isValid:
          userAction.validators && userAction.validators.length
            ? validate(userAction.userActionValue, userAction.validators)
            : true, // added this to make it work but probably shouldn't
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

export const Input = (props: InputProps) => {
  const [inputReducerState, dispatch] = useReducer(inputReducer, {
    userInputValue: props.initialValue,
    isValid: true,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { userInputValue, isValid } = inputReducerState;

  useEffect(() => {
    onInput(id, userInputValue, isValid);
  }, [id, userInputValue, isValid, onInput]);

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

  const inputElement = () => {
    if (props.type === 'text')
      return (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputReducerState.userInputValue}
          data-attribute={props.hidden ? props.hidden : ''}
        />
      );
    if (props.type === 'number')
      return (
        <input
          id={props.id}
          type={props.type}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputReducerState.userInputValue}
          data-attribute={props.hidden ? props.hidden : ''}
        />
      );
    if (props.type === 'checkbox')
      return (
        <input
          id={props.id}
          type={props.type}
          onChange={changeHandler}
          value={inputReducerState.userInputValue}
          data-attribute={props.hidden ? props.hidden : ''}
        />
      );
    if (props.type === 'select')
      return (
        <select
          id={props.id}
          onChange={changeHandler}
          value={inputReducerState.userInputValue}
          data-attribute={props.hidden ? props.hidden : ''}
        >
          {props.sizes &&
            props.sizes.map((size) => (
              <option value={size.value} id={size.id}>
                {size.value}
              </option>
            ))}
        </select>
      );
    if (props.type === 'textArea')
      return (
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputReducerState.userInputValue}
          data-attribute={props.hidden ? props.hidden : ''}
        />
      );
  };

  return (
    <div
      className={`form-control ${
        !inputReducerState.isValid &&
        inputReducerState.isTouched &&
        `form-control--invalid`
      }`}
    >
      <>
        <label htmlFor={props.id}>{props.label}</label>
        {inputElement}
        {!inputReducerState.isValid &&
          inputReducerState.isTouched &&
          props.errorText && <p>{props.errorText}</p>}
      </>
    </div>
  );
};
