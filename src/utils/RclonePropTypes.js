import PropTypes from "prop-types";

export const PROP_FS_INFO = PropTypes.oneOfType([
    PropTypes.shape({
        Features: PropTypes.object.isRequired,
        Hashes: PropTypes.array.isRequired,
        Name: PropTypes.string.isRequired,
        Precision: PropTypes.number.isRequired,
        String: PropTypes.string.isRequired
    }),
    PropTypes.object
]);

export const PROP_CURRENT_PATH = PropTypes.shape({
    remoteName: PropTypes.string.isRequired,
    remotePath: PropTypes.string.isRequired
});