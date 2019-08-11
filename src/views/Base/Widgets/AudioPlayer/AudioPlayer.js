import React, {useState} from "react";
import {Button, Modal} from "reactstrap";
import * as ReactDOM from "react-dom";
import {MODAL_ROOT_ELEMENT} from "../../../../utils/Constants";
import * as PropTypes from "prop-types";
import ErrorBoundary from "../../../../ErrorHandling/ErrorBoundary";

function AudioPlayer({playbackURL, MimeType}) {

    const [preview, setPreview] = useState(true);

    function hideFull(e) {
        e.stopPropagation();
        setPreview(!preview);

    }

    let element;
    if (preview) {
        element = (
            <div className="img-thumbnail w-100 text-center" data-test="audioPlayerWidget">
                <Button color="link" onClick={hideFull}>
                    {/*<i className="fa fa-play-circle fa-4x"/>*/}
                    <audio controls>
                        <source src={playbackURL} type={MimeType}/>
                        Your browser does not support the audio tag.
                    </audio>
                </Button>
            </div>
        )
    } else {

        // Load the video


        element = ReactDOM.createPortal((
            <Modal className="task-modal d-none d-sm-block" data-test="videoPlayerWidget" isOpen={!preview}
                   toggle={hideFull}>


                <audio controls>
                    <source src={playbackURL} type={MimeType}/>
                    Your browser does not support the audio tag.
                </audio>

            </Modal>
        ), document.getElementById(MODAL_ROOT_ELEMENT));
    }

    return (
        <ErrorBoundary>
            {element}
        </ErrorBoundary>
    )


}

AudioPlayer.propTypes = {
    playbackURL: PropTypes.string.isRequired,
    MimeType: PropTypes.string.isRequired
};

export default AudioPlayer;