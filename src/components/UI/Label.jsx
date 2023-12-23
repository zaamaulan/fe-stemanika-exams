import PropTypes from 'prop-types';

const Label = ({children}) => {
    return (
        <label className='font-medium mb-2 '>
            {children}
        </label>
    );
};

Label.propTypes = {
    children: PropTypes.node
};

export default Label;