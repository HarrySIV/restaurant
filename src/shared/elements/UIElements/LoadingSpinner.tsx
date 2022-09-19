import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const LoadingSpinner = () => {
  const content = <FontAwesomeIcon icon={faSpinner} />;

  return ReactDOM.createPortal(
    content,
    document.getElementById('overlays') as HTMLElement
  );
};
