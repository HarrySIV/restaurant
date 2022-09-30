import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../../hooks/modal-hook';

import './_modal.scss';
import { Button } from '../formElements/Button';

interface IModalProps {
  children?: React.ReactNode;
  header: string;
}

export const Modal = (props: IModalProps) => {
  const { isModalOpen, setIsModalOpen } = useModal();

  const closeModalHandler = () => {
    if (isModalOpen) setIsModalOpen(false);
  };

  const content = (
    <div className="modal">
      <header className="modal__header">
        <h2 className="title">{props.header}</h2>
        <Button
          onClick={closeModalHandler}
          type="submit"
          text={<FontAwesomeIcon icon={faClose} />}
        />
      </header>
      <main>{props.children}</main>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook') as HTMLElement
  );
};
