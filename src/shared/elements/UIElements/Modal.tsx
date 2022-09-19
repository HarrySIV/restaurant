import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import './_modal.scss';

export const Modal: React.FC<{ children?: React.ReactNode }> = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModalHandler = () => {
    if (modalIsOpen) setModalIsOpen(false);
  };

  const content = (
    <div className="modal">
      <header>
        <h2 className="title">Hello</h2>
        <button onClick={closeModalHandler}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      </header>
      <main>{props.children}</main>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook') as HTMLElement
  );
};