import React from 'react';

type props = {
  element: string;
  type: string;
  placeholder: string;
  id: string;
  label: string;
  rows: number;
};

export const Input = (props: props) => {
  const inputElement =
    props.element === 'input' ? (
      <input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
      <textarea id={props.id} rows={props.rows} />
    );
  return (
    <div className="{`form-control`">
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
    </div>
  );
};
