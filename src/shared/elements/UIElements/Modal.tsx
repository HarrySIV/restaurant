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
    <div className="modal-backdrop">
      <div className="modal">
        <header className={`modal__header`}>
          <Button
            closeHandler={props.closeHandler}
            text={<FontAwesomeIcon icon={faClose} />}
          />
          <h2 className="modal__title">{props.header}</h2>
        </header>
        <main>{props.children}</main>
        <footer className="modal__footer">{props.footer}</footer>
      </div>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook') as HTMLElement
  );
};
