import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ children, className, title, content }) => {
  return (
    <div className="fixed flex h-52 w-full max-w-screen-sm flex-col items-center justify-center bg-black p-14 text-center text-white">
      <p className="mb-4 text-2xl font-semibold">{title}</p>
      <p className="font-base text-gray-300">{content}</p>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
}

export default Modal
