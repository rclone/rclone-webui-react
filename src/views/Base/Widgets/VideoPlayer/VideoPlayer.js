import React, {useState} from "react";
import {Button} from "reactstrap";
import * as ReactDOM from "react-dom";
import {MODAL_ROOT_ELEMENT} from "../../../../utils/Constants";
import * as PropTypes from "prop-types";
import ErrorBoundary from "../../../../ErrorHandling/ErrorBoundary";
import Iframe from 'react-iframe'

import ReactAwesomePlayer from 'react-awesome-player'
import {connect} from "react-redux";

class PlayerComponent extends React.Component {
    // loadeddata() {
    //     console.log('loadeddata')
    // }
    // canplay() {
    //     console.log('canplay')
    // }
    // canplaythrough() {
    //     console.log('canplaythrough')
    // }
    // play() {
    //     console.log('play')
    // }
    // pause() {
    //     console.log('pause')
    // }
    // waiting() {
    //     console.log('waiting')
    // }
    // playing() {
    //     console.log('playing')
    // }
    // ended() {
    //     console.log('ended')
    // }
    error() {
        console.log('error')
    }

    render() {
        const {options} = this.props;
        return <ReactAwesomePlayer
            options={options}

            error={this.error}
        />
    }
}

function VideoPlayer({playbackURL, MimeType}) {

    const [preview, setPreview] = useState(true);

    // if (!loadedTestPlugins) {
    //     return null;
    // }
    // const pluginUrl = loadedTestPlugins["rclone/video-plugin"];

    // console.log("Plugin URL: " + pluginUrl, loadedTestPlugins)


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
                </Button>
            </div>
        )
    } else {
        // if (!pluginUrl) return <p>Cannot load plugin</p>;
        // Load the video

        const subtitleURL = playbackURL.substring(0, playbackURL.lastIndexOf('.')) + ".vtt";
        console.log(subtitleURL);

        // const options = {
        //     options: {
        //         sources: [{
        //             type: MimeType,
        //             src: playbackURL
        //         }],
        //         subtitles: [
        //             {
        //                 language: 'en',
        //                 url: subtitleURL,
        //                 label: "EN"
        //             }],
        //     }
        // };
        //

        element =
            ReactDOM.createPortal(
                <>
                    <div className="task-modal d-none d-sm-block" data-test="videoPlayerWidget">

                        {/*<video id="video" controls preload="metadata" width="600">*/}
                        {/*    <source src={playbackURL} type={MimeType}/>*/}
                        {/*</video>*/}
                        {/*<PlayerComponent {...options}/>*/}
                        <Iframe
                            url={`http://localhost:5572/plugins/rclone/video-plugin/?loadUrl=${playbackURL}&mimeType=${MimeType}`}
                            allowTransparency="true"
                            allowFullScreen="true"
                            width="100%"
                            height="100%"
                            display="initial"
                            position="relative"/>
                        <Button color="link" onClick={hideFull} className="modal-button">
                            <i
                                className="fa fa-close fa-3x"
                            />
                        </Button>
                    </div>
                    <div className="modal-backdrop fade show"></div>


                </>, document.getElementById(MODAL_ROOT_ELEMENT));
    }

    return (
        <ErrorBoundary>
            {element}
        </ErrorBoundary>
    )


}

VideoPlayer.propTypes = {
    playbackURL: PropTypes.string.isRequired,
    MimeType: PropTypes.string.isRequired,
    loadedTestPlugins: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    loadedTestPlugins: state.plugins.loadedTestPlugins
});

export default connect(mapStateToProps, {})(VideoPlayer);
