import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const LoadingSpinner = () => {
  const content = (
    <FontAwesomeIcon icon={faSpinner} className="faicon" pulse size="10x" />
  );

  return content;
};
