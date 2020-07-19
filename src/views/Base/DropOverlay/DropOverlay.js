import React from "react";

const DropOverlay = (props) => (<div data-test="dropOverlay"
                                     style={{
                                         position: 'absolute',
                                         top: 0,
                                         left: 0,
                                         height: '100%',
                                         width: '100%',
                                         zIndex: 1,
                                         opacity: 0.5,
                                         backgroundColor: 'gray',
                                     }}
/>);

export default DropOverlay;