interface ButtonProps {
  type: 'submit' | 'reset';
  disabled: boolean;
}

export const Button = ({ type, disabled }: ButtonProps) => {
  return <button type={type} disabled={disabled}></button>;
};
