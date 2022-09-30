import React, { useReducer, useEffect, Reducer } from 'react';
import { validate } from '../../util/validators';

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
  hidden: boolean;
  label: string;
  errorText: string;
  validators?: { type: string; configVal?: number }[];
  initialValue?: string;
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
    userInputIsValid: props.initialValid || false,
    userInputIsTouched: false,
  });

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
        !inputReducerState.userInputIsValid &&
        inputReducerState.userInputIsTouched &&
        `form-control--invalid`
      }`}
    >
      <>
        <label htmlFor={props.id}>{props.label}</label>
        {inputElement}
        {!inputReducerState.userInputIsValid &&
          inputReducerState.userInputIsTouched &&
          props.errorText && <p>{props.errorText}</p>}
      </>
    </div>
  );
};
