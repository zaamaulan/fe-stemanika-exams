import PropTypes from 'prop-types'

const Button = ({ children, isDisabled, className }) => {
  return (
    <button
      disabled={isDisabled}
      className={`w-full rounded-md ${className ? className : 'bg-black text-white hover:bg-black/90'}  px-5 py-3 text-xs font-medium  transition duration-500  md:w-fit xl:px-8 xl:py-4 xl:text-base`}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
}

export default Button
