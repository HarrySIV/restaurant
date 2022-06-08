import { Link } from 'react-router-dom';

import Careers from '../pages/Careers.js';

const Join = () => {
  return (
    <h2>
      Join our team{' '}
      <Link to={<Careers />}>
        <span className="link">here!</span>
      </Link>
    </h2>
  );
};

export default Join;
