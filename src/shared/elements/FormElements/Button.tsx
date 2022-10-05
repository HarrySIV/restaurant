import './_button.scss';

interface ButtonProps {
  type?: 'submit' | 'reset';
  text: string | JSX.Element;
  disabled?: boolean;
  closeHandler?: any;
  onClick?: any;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className="button"
      type={props.type}
      disabled={props.disabled}
      onClick={props.closeHandler}
    >
      {props.text}
    </button>
  );
};
