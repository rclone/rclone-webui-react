import {NativeTypes} from 'react-dnd-html5-backend'
import {useDrop} from 'react-dnd'
import React from "react";
import DropOverlay from "../DropOverlay/DropOverlay";
import * as PropTypes from 'prop-types';


export const FileUploadBox = (props) => {
    const {onDrop} = props
    const [{canDrop, isOver}, drop] = useDrop({
        accept: [NativeTypes.FILE],
        drop(item, monitor) {
            if (onDrop) {
                onDrop(props, monitor)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })
    const isActive = canDrop && isOver
    return (
        <div ref={drop}>
            {/*Display overlay if file is about to be dropped*/}
            {isActive && <DropOverlay/>}
            {props.children}
        </div>
    )
}

FileUploadBox.propTypes = {
    onDrop: PropTypes.func
}

export default FileUploadBox;