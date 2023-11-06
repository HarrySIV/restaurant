import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const LoadingSpinner = () => {
  return (
    <FontAwesomeIcon icon={faSpinner} className="faicon" pulse size="10x" />
  );
};
