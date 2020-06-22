import React from "react";
import * as PropTypes from "prop-types";

const mimeClassMap = {
    "application/pdf": "fa-file-pdf-o",
    "image/jpeg": "fa-file-image-o",
    "application/rar": "fa-file-archive-o",
    "application/x-rar-compressed": "fa-file-archive-o",
    "application/zip": "fa-file-archive-o",
    "text/plain": "fa-file-text-o",
    "text/x-vcard": "fa-address-card-o"
}

function FileIcon({IsDir, MimeType}) {
    let className = mimeClassMap[MimeType];
    if (IsDir) {
        className = "fa-folder"
    }
    if (!className) className = "fa-file";

    return <i className={className + " fa fa-lg"} data-test="fileIconComponent"/>;
}

FileIcon.propTypes = {
    IsDir: PropTypes.bool.isRequired,
    MimeType: PropTypes.string.isRequired
}

export default FileIcon;