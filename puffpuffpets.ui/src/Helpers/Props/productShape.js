import PropTypes from 'prop-types';

const productShape = PropTypes.shape ({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
});

export default { productShape };