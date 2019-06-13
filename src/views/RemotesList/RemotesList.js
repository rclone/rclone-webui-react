import React from 'react';
import "../../utils/Global";
import RemoteListAutoSuggest from "./RemoteListAutoSuggest";
import {connect} from "react-redux";
import {getFsInfo, getRemoteNames} from "../../actions/explorerActions";
import PropTypes from 'prop-types'
import {changeRemoteName} from "../../actions/explorerStateActions";
import {Button, Col, Form, Row} from "reactstrap";

class RemotesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmpty: false,
            remoteName: props.remoteName,
            openEnabled: false
        };
    }

    componentDidMount() {

        this.props.getRemoteNames();
    }

    shouldUpdateRemoteName = (event, {newValue}) => {
        this.setState({remoteName: newValue});

        if (this.props.remotes.indexOf(newValue) !== -1) {
            this.setState({openEnabled: true});

        } else {
            this.setState({openEnabled: false})

        }
    };

    openRemote = () => {
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
                <Form onSubmit={() => this.openRemote()}>
                    <Row>

                        <Col xs={12} sm={10} lg={8}>
                            <RemoteListAutoSuggest value={remoteName} onChange={this.shouldUpdateRemoteName}
                                                   suggestions={remotes}/>
                        </Col>
                        <Col xs={12} sm={2} lg={2}>

                            <Button className={"btn-lg"} color="success"
                                    type="submit">Open</Button>
                        </Col>

                    </Row>
                </Form>

            );
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    remotes: state.remote.remotes,
    hasError: state.remote.hasError,
    error: state.remote.error,
    currentPath: state.explorer.currentPaths[ownProps.containerID],
});

const propTypes = {
    remotes: PropTypes.array.isRequired,
    error: PropTypes.object,
    hasError: PropTypes.bool,
    containerID: PropTypes.string.isRequired,

    currentPath: PropTypes.shape({
        remoteName: PropTypes.string.isRequired,
        remotePath: PropTypes.string.isRequired
    })

};


const defaultProps = {};

RemotesList.propTypes = propTypes;
RemotesList.defaultProps = defaultProps;


export default connect(mapStateToProps, {
    getRemoteNames,
    getFsInfo,
    changeRemoteName,

})(RemotesList);
