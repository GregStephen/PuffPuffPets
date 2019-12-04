  import PropTypes from 'prop-types';

const userDataShape = PropTypes.shape({
  userName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isSeller: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
});

export default { userDataShape };