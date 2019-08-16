import React from 'react';
import RemoteListAutoSuggest from "./RemoteListAutoSuggest";
import {connect} from "react-redux";
import {getFsInfo, getRemoteNames} from "../../../actions/explorerActions";
import PropTypes from 'prop-types'
import {changeRemoteName} from "../../../actions/explorerStateActions";
import {Button, Col, Form, Row} from "reactstrap";
import {PROP_CURRENT_PATH} from "../../../utils/RclonePropTypes";

class RemotesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmpty: false,
            remoteName: props.remoteName,
            openEnabled: false,
            openButtonText: "Open"
        };
    }

    componentDidMount() {

        this.props.getRemoteNames();
    }

    shouldUpdateRemoteName = (event, {newValue}) => {
        if (newValue.indexOf('/') === 0) {
            this.setState({
                remoteName: newValue,
                openButtonText: "Open local path",

            });
        } else {
            this.setState({
                remoteName: newValue,
                openButtonText: "Open"
            });
        }


    };

    openRemote = (e) => {
        e.preventDefault();
        const {changeRemoteName, containerID} = this.props;
        const {remoteName} = this.state;
        changeRemoteName(containerID, remoteName);

        this.props.getFsInfo(remoteName);

    };


    render() {
        const {isEmpty, remoteName} = this.state;
        const {remotes} = this.props;
        const {hasError} = this.props;
        // const {updateRemoteNameHandle} = this.props;

        if (hasError) {
            return (
                <div>
                    Error loading remotes. Please try again.
                </div>
            )
        } else if (isEmpty) {
            return (
                <div>
                    Add some remotes to see them here <span role="img" aria-label="sheep">🐑</span>.
                </div>);
        } else {

            return (
                <Form onSubmit={this.openRemote}>
                    <Row>

                        <Col xs={12} sm={10} lg={8}>
                            <RemoteListAutoSuggest value={remoteName} onChange={this.shouldUpdateRemoteName}
                                                   suggestions={remotes}/>
                        </Col>
                        <Col xs={12} sm={2} lg={4}>

                            <Button className={"btn-lg"} color="success">{this.state.openButtonText}</Button>
                        </Col>

                    </Row>
                </Form>

            );
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    remotes: state.remote.remotes,
    hasError: false,
    error: state.remote.error,
    currentPath: state.explorer.currentPaths[ownProps.containerID],
});

const propTypes = {
    remotes: PropTypes.array.isRequired,
    error: PropTypes.object,
    hasError: PropTypes.bool,
    containerID: PropTypes.string.isRequired,

    currentPath: PROP_CURRENT_PATH

};


const defaultProps = {};

RemotesList.propTypes = propTypes;
RemotesList.defaultProps = defaultProps;


export default connect(mapStateToProps, {
    getRemoteNames,
    getFsInfo,
    changeRemoteName,

})(RemotesList);
