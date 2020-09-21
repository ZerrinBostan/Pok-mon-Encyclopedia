import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import Icon from '../components/Icon';

const Button = ({ className, text, loading, icon, ...props }) => {
  const { name, size, color } = icon;

  return (
    <button type="button" className={`btn ${className}`} {...props}>
      {loading ? (
        <ReactLoading
          type="spinningBubbles"
          width={18}
          height={18}
          color="white"
        />
      ) : (
        <>
          {icon && <Icon icon={name} size={size} color={color} />}
          <span>{text}</span>
        </>
      )}
    </button>
  );
};
Button.defaultProps = {
  text: '',
  className: '',
  loading: false,
  icon: {},
};

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  loading: PropTypes.bool,
  icon: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
  }),
};

export default Button;
