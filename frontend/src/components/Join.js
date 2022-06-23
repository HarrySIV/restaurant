import { NavLink } from 'react-router-dom';

const Join = () => {
  return (
    <h2>
      Join our team{' '}
      <NavLink to="/careers">
        <span className="link">here!</span>
      </NavLink>
    </h2>
  );
};

export default Join;
