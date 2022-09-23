import { useCallback, useReducer } from 'react';

interface Inputs {
  id: string;
  value: string | number;
  isValid: boolean;
}

/*inputs: { title: { value: 'This is the Title', isValid: true } }*/

interface FormState {
  inputs: {
    size: Inputs;
    //toppings: Inputs[]; //idk what to do here yet
    quantity: Inputs;
    _id: Inputs;
  };
  isFormValid: boolean;
}

type FormAction =
  | {
      type: 'INPUT_CHANGE';
      value: string | number;
      inputId: string;
      isValid: boolean;
      payload?: undefined;
    }
  | {
      type: 'SET_DATA';
      isFormValid: boolean;
      inputs: Inputs;
      payload?: undefined;
    };

interface IInitialFormValidity {
  [key: string]: { value: string | number; isValid: boolean };
}

/* on input 'change' or 'set', reduces information to either preset in order to be 
   handled by useform. Essentially, the reducer handles the individual inputs to 
   be sent to  */
const formReducer = (formState: FormState, formAction: FormAction) => {
  switch (formAction.type) {
    case 'INPUT_CHANGE':
      /* This for loop goes through all inputs and checks validity.
      If any of the inputs validity are false, then formIsValid becomes and/or stays false, 
      and the whole form becomes invalid */
      let returnIsFormValid = true;
      for (const inputId in formState.inputs) {
        if (!formState.inputs[inputId as keyof typeof formState.inputs])
          continue;
        inputId === formAction.inputId
          ? (returnIsFormValid = returnIsFormValid && formAction.isValid)
          : (returnIsFormValid =
              returnIsFormValid &&
              formState.inputs[inputId as keyof typeof formState.inputs]
                .isValid);
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
        isValid: returnIsFormValid,
      };
    case 'SET_DATA':
      return {
        inputs: formAction.inputs,
        isValid: formAction.isFormValid,
      };
    default:
      return formState;
  }
};
//{key: {value: string | number, isValid: boolean}, key: {value: string | number, isValid: boolean}, key: {value: string | number, isValid: boolean}}
export const useForm = (
  initialInputs: IInitialFormValidity,
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isFormValid: initialFormValidity,
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
    (userInputData: Inputs, formValidity: boolean) => {
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
