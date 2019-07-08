import React, {useState} from "react";
import {Button, Modal} from "reactstrap";
import * as ReactDOM from "react-dom";
import {MODAL_ROOT_ELEMENT} from "../../utils/Constants";

function VideoPlayer({playbackURL, MimeType}) {

    const [preview, setPreview] = useState(true);

    function hideFull(e) {
        e.stopPropagation();
        setPreview(!preview);

    }

    if (preview) {
        return (
            <div className="img-thumbnail w-100 text-center">
                <Button color="link" onClick={hideFull}>
                    <i className="fa fa-play-circle fa-4x"/>
                </Button>
            </div>
        )
    } else {

        // Load the video


        return ReactDOM.createPortal((
            <Modal className="task-modal d-none d-sm-block" isOpen={!preview} toggle={hideFull}>

                <video controls width="600">
                    <source src={playbackURL} type={MimeType}/>
                </video>

            </Modal>
        ), document.getElementById(MODAL_ROOT_ELEMENT));
    }


}

export default VideoPlayer;