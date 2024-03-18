import './Button.css';
import PropTypes from 'prop-types';

function Button({ style ,className, children, onClick }) {
  return (
    <button style={style} className={`button ${className}`} onClick={onClick}>{children}</button>
  )
}

export default Button;

Button.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
}