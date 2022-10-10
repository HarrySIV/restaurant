import { useEffect, useState } from 'react';
import './_button.scss';

interface ButtonProps {
  type?: 'submit' | 'reset';
  text: string | JSX.Element;
  disabled?: boolean;
  closeHandler?: any;
  onClick?: any;
}

export const Button = (props: ButtonProps) => {
  const [buttonHandler, setButtonHandler] = useState<any>();
  useEffect(() => {
    if (props.onClick) setButtonHandler(true);
    else setButtonHandler(false);
  }, [props]);
  return (
    <button
      className="button"
      type={props.type}
      disabled={props.disabled}
      onClick={buttonHandler ? props.onClick : props.closeHandler}
    >
      {props.text}
    </button>
  );
};
