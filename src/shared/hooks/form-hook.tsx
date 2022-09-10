import { useCallback, useReducer } from 'react';

interface Inputs {
  id: string;
  value: string;
  inputIsValid: boolean;
}

interface FormState {
  inputs: Inputs[];
  isValid: boolean;
}

interface FormAction {
  inputs: Inputs;
  type: string;
  value: string;
  inputId: string;
  isValid: boolean;
  formIsValid: boolean;
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) continue;
        if (inputId === action.inputId)
          formIsValid = formIsValid && action.isValid;
        else formIsValid = formIsValid && state.inputs[inputId].inputIsValid;
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: Inputs,
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });
  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );
  const setFormData = useCallback(
    (inputData: Inputs, formValidity: boolean) => {
      dispatch({
        type: 'SET_DATA',
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );
  return [formState, inputHandler, setFormData];
};
