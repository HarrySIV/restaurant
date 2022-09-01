import ReactDOM from 'react-dom';

import '../../styles/elements/_modal.scss';

const Modal = (props) => {
  const content = (
    <div className="backdrop">
      <div className="modal">
        <header>
          <h2 className="title">{props.header}</h2>
        </header>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

export default Modal;
