import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../../hooks/modal-hook';

import './_modal.scss';

export const Modal: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { isModalOpen, setIsModalOpen } = useModal();

  const closeModalHandler = () => {
    if (isModalOpen) setIsModalOpen(false);
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
