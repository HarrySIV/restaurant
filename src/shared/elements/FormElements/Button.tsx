interface ButtonProps {
  type: 'submit' | 'reset';
  text: string;
  disabled: boolean;
}

export const Button = (props: ButtonProps) => {
  return (
    <button type={props.type} disabled={props.disabled}>
      {props.text}
    </button>
  );
};
