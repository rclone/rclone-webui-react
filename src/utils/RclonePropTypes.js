import * as PropTypes from "prop-types";

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

export const PROP_CONTAINER_ID = PropTypes.string;

export const PROP_LOAD_IMAGES_BOOL = PropTypes.bool;

export const PROP_IN_VIEWPORT = PropTypes.bool;

export const PROP_ITEM = PropTypes.shape({

    Path: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Size: PropTypes.number,
    MimeType: PropTypes.string,
    ModTime: PropTypes.string.isRequired,
    IsDir: PropTypes.bool.isRequired

});

export const PROP_BANDWIDTH = PropTypes.shape({
    // bytesPerSecond: PropTypes.number.isRequired,
    rate: PropTypes.string.isRequired

});