import React, {useState} from "react";
import {Button, Modal} from "reactstrap";
import * as ReactDOM from "react-dom";
import {MODAL_ROOT_ELEMENT} from "../../../../utils/Constants";
import * as PropTypes from "prop-types";
import ErrorBoundary from "../../../../ErrorHandling/ErrorBoundary";
import ReactPlayer from "react-player";

function VideoPlayer({playbackURL, MimeType}) {

    const [preview, setPreview] = useState(true);

    function hideFull(e) {
        e.stopPropagation();
        setPreview(!preview);

    }

    let element;
    if (preview) {
        element = (
            <div className="img-thumbnail w-100 text-center" data-test="videoPlayerWidget">
                <Button color="link" onClick={hideFull}>
                    <i className="fa fa-play-circle fa-4x"/>
                    <ReactPlayer url={playbackURL} light={true} controls={true}/>
                </Button>
            </div>
        )
    } else {

        // Load the video


        element = ReactDOM.createPortal((
            <Modal className="task-modal d-none d-sm-block" data-test="videoPlayerWidget" isOpen={!preview}
                   toggle={hideFull}>

                {/*<video id="video" controls preload="metadata" width="600">*/}
                {/*    <source src={playbackURL} type={MimeType}/>*/}
                {/*</video>*/}

                {/*<div id="video-controls" className="controls" data-state="hidden">*/}
                {/*    <button id="playpause" type="button" data-state="play">Play/Pause</button>*/}
                {/*    <button id="stop" type="button" data-state="stop">Stop</button>*/}
                {/*    <div className="progress">*/}
                {/*        <progress id="progress" value="0" min="0">*/}
                {/*            <span id="progress-bar"></span>*/}
                {/*        </progress>*/}
                {/*    </div>*/}
                {/*    <button id="mute" type="button" data-state="mute">Mute/Unmute</button>*/}
                {/*    <button id="volinc" type="button" data-state="volup">Vol+</button>*/}
                {/*    <button id="voldec" type="button" data-state="voldown">Vol-</button>*/}
                {/*    <button id="fs" type="button" data-state="go-fullscreen">Fullscreen</button>*/}
                {/*    <button id="subtitles" type="button" data-state="subtitles">CC</button>*/}
                {/*</div>*/}
                <ReactPlayer url={playbackURL} controls={true}/>

            </Modal>
        ), document.getElementById(MODAL_ROOT_ELEMENT));
    }

    return (
        <ErrorBoundary>
            {element}
        </ErrorBoundary>
    )


}

VideoPlayer.propTypes = {
    playbackURL: PropTypes.string.isRequired,
    MimeType: PropTypes.string.isRequired
};

export default VideoPlayer;