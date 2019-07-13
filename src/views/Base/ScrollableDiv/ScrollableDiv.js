import React from "react";

function ScrollableDiv({height, children}) {
    return (
        <div style={{overflow: "auto", height: height}}>
            {children}
        </div>)
}

export default ScrollableDiv;
