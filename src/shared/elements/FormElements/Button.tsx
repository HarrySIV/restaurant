interface ButtonProps {
  type: 'submit' | 'reset';
  text: string | JSX.Element;
  disabled?: boolean;
  onClick: any;
}

export const Button = (props: ButtonProps) => {
  return (
    <button type={props.type} disabled={props.disabled}>
      {props.text}
    </button>
  );
};
