import { useCallback, useReducer } from 'react';

interface Inputs {
  _id: string;
  value: string | number;
  isValid: boolean;
}

interface FormState {
  inputs: Inputs[];
  isValid: boolean;
}

type FormAction =
  | {
      type: 'INPUT_CHANGE';
      value: string | number;
      inputId: string;
      isValid: boolean;
    }
  | { type: 'SET_DATA'; formIsValid: boolean; inputs: Inputs[] };

/* on input change or set, reduces information to either preset in order to be handled by useform.
     Essentially, the reducer handles the individual inputs to be sent to  */
const formReducer = (formState: FormState, formAction: FormAction) => {
  switch (formAction.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in formState.inputs) {
        if (!formState.inputs[inputId]) continue;
        inputId === formAction.inputId
          ? (formIsValid = formIsValid && formAction.isValid)
          : (formIsValid = formIsValid && formState.inputs[inputId].isValid);
      }
      return {
        ...formState,
        inputs: {
          ...formState.inputs,
          [formAction.inputId]: {
            value: formAction.value,
            isValid: formAction.isValid,
          },
        },
        isValid: formIsValid,
      };
    case 'SET_DATA':
      return {
        inputs: formAction.inputs,
        isValid: formAction.formIsValid,
      };
    default:
      return formState;
  }
};

export const useForm = (
  initialInputs: Inputs[],
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });
  const inputHandler = useCallback(
    (id: string, value: string | number, isValid: boolean) => {
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
    (userInputData: Inputs[], formValidity: boolean) => {
      dispatch({
        type: 'SET_DATA',
        inputs: userInputData,
        formIsValid: formValidity,
      });
    },
    []
  );
  return [formState, inputHandler, setFormData];
};
