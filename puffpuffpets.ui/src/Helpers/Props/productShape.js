import PropTypes from 'prop-types';

const productShape = PropTypes.shape ({
    Id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImgUrl: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Price: PropTypes.number.isRequired
});

export default { productShape };