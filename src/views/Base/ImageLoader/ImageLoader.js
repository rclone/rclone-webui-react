import React, {useEffect, useState} from 'react';
import {Col, Container, Modal, Row, Spinner} from "reactstrap";
import * as ReactDOM from "react-dom";
import {MODAL_ROOT_ELEMENT} from "../../../utils/Constants";
import {connect} from "react-redux";
import {downloadImage} from "../../../actions/imagesActions";
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'

function ImageLoader({downloadURL, inViewport, imageData, downloadImage, currentPath}) {

    const [preview, setPreview] = useState(true);
    // const [rotateAngle, setRotateAngle] = useState(0);


    useEffect(() => {
        if (inViewport && downloadURL && !imageData) {
            downloadImage(downloadURL);
        }
    });


    function hideFull(e) {
        e.stopPropagation();
        setPreview(!preview);
    }

    //
    // function rotateLeft() {
    //     if (rotateAngle > 0)
    //         setRotateAngle((rotateAngle - 90) % 360);
    //     else
    //         setRotateAngle((360 - rotateAngle - 90) % 360);
    // }
    //
    // function rotateRight() {
    //     setRotateAngle((rotateAngle + 90) % 360);
    // }

    if (preview) {
        return (
            <div onClick={hideFull}>

                {
                    !imageData || imageData.isLoading ? <Spinner>Loading...</Spinner> :
                        <img className="img-thumbnail pd-0 m-0" src={imageData.data} alt=""/>
                }
            </div>
        );
    } else {

        // Load the Image

        const externalCloseBtn = <button className="close" style={{position: 'absolute', top: '15px', right: '15px'}}
                                         onClick={hideFull}><i className="fa fa-close fa-inverse"/></button>;

        const myTheme = {
            // Theme object to extends default dark theme.
        };
        const MyComponent = () => (
            <ImageEditor
                includeUI={{
                    loadImage: {
                        path: imageData.data,
                        name: 'SampleImage'
                    },
                    theme: myTheme,
                    menu: ['shape', 'filter', 'crop'],
                    initMenu: 'filter',
                    uiSize: {
                        width: '80vw',
                        height: '90vh'
                    },
                    menuBarPosition: 'bottom',
                }}
                cssMaxHeight={500}
                cssMaxWidth={700}
                selectionStyle={{
                    cornerSize: 20,
                    rotatingPointOffset: 70
                }}
                usageStatistics={false}
            />
        );




        return ReactDOM.createPortal((
            <Modal className="image-modal" isOpen={!preview} toggle={hideFull} external={externalCloseBtn}>
                <Container fluid={true}>
                    <Row>
                        <Col lg={8}>
                            {/*<img*/}
                            {/*    className={"rotatableImage img-thumbnail pd-0 m-0 " + (rotateAngle !== 0 ? "rotate" + rotateAngle : "")}*/}
                            {/*    src={imageData.data} alt=""/>*/}
                            <MyComponent/>
                        </Col>


                    </Row>
                </Container>
            </Modal>
        ), document.getElementById(MODAL_ROOT_ELEMENT));
    }


}

const mapStateToProps = (state, ownProps) => {
    const {downloadURL} = ownProps;

    return {
        imageData: state.imageLoader[downloadURL]
    }
};

export default connect(mapStateToProps, {downloadImage})(ImageLoader);