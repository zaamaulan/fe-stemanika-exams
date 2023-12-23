import PropTypes from 'prop-types';

const Card = ({ children, className }) => (
  <div className={`mx-auto w-full rounded-md border-2 bg-white px-6 py-6 shadow-sm md:px-10 md:py-8 ${className || 'h-full'}`}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card