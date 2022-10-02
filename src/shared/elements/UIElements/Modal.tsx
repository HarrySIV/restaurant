import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import './_modal.scss';
import { Button } from '../formElements/Button';

interface IModalProps {
  closeHandler: () => void;
  header: string;
  footer?: string | JSX.Element;
  children?: React.ReactNode;
}

export const Modal = (props: IModalProps) => {
  const content = (
    <div className="modal">
      <header className={`modal__header`}>
        <h2 className="title">{props.header}</h2>
        <Button
          closeHandler={props.closeHandler}
          text={<FontAwesomeIcon icon={faClose} />}
        />
      </header>
      <main>{props.children}</main>
      <footer className="modal__footer">{props.footer}</footer>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook') as HTMLElement
  );
};
