import { useCallback, useReducer, Reducer } from 'react';

interface FormStateInputs {
  [key: string]: { value: string; isValid: boolean; checked?: boolean };
}

interface FormState {
  inputs: FormStateInputs;
  isFormValid: boolean;
}

type FormAction =
  | {
      type: 'INPUT_CHANGE';
      value: string;
      inputId: string;
      isValid: boolean;
      checked?: boolean;
    }
  | {
      type: 'SET_DATA';
      inputs: FormStateInputs;
      isFormValid: boolean;
    };

/* on input 'change' or 'set', reduces information to either preset in order to be 
   handled by useform. Essentially, the reducer handles the individual inputs to 
   be sent to the form state, which should ultimately be inserted into the OrderContext */
const formReducer: Reducer<FormState, FormAction> = (formState, formAction) => {
  switch (formAction.type) {
    case 'INPUT_CHANGE':
      /* This for loop goes through all inputs and checks validity.
      If any of the inputs validity are false, then formIsValid becomes and/or stays false, 
      and the whole form becomes invalid */
      let returnIsFormValid = true;
      for (const inputId in formState.inputs) {
        if (!formState.inputs[inputId]) continue;
        inputId === formAction.inputId
          ? (returnIsFormValid = returnIsFormValid && formAction.isValid)
          : (returnIsFormValid =
              returnIsFormValid && formState.inputs[inputId].isValid);
      }
      return {
        ...formState,
        inputs: {
          ...formState.inputs,
          [formAction.inputId]: {
            value: formAction.value,
            isValid: formAction.isValid,
            checked: formAction.checked ? formAction.checked : false,
          },
        },
        isFormValid: returnIsFormValid,
      };
    case 'SET_DATA':
      return {
        inputs: formAction.inputs,
        isFormValid: formAction.isFormValid,
      };
    default:
      return formState;
  }
};

/* useForm takes TWO arguments, the initial inputs and the initial form validity. It then uses a
reducer to update formState from the inputs dispatched from the input handler... setFormData
should be used when the form "submit" button is clicked. */
export const useForm = (
  initialInputs: FormStateInputs,
  initialFormValidity: boolean
): [
  FormState,
  (id: string, userInputValue: string, userInputIsValid: boolean) => void,
  (userInputData: FormStateInputs, formValidity: boolean) => void
] => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isFormValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (
      id: string,
      userInputValue: string,
      userInputIsValid: boolean,
      checked?: boolean
    ) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value: userInputValue,
        isValid: userInputIsValid,
        inputId: id,
        checked: checked,
      });
    },
    []
  );

  const setFormData = useCallback(
    (userInputData: FormStateInputs, formValidity: boolean) => {
      dispatch({
        type: 'SET_DATA',
        inputs: userInputData,
        isFormValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData];
};
