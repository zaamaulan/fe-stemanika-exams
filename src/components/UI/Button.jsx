import PropTypes from 'prop-types'

const ButtonPrimary = ({ children }) => {
  return (
    <button className="rounded-md bg-black px-5 py-3 text-sm font-medium text-white transition duration-500 hover:bg-black/90 xl:px-8 xl:py-4 xl:text-base">
      {children}
    </button>
  )
}

ButtonPrimary.propTypes = {
  children: PropTypes.node,
}

export default ButtonPrimary
