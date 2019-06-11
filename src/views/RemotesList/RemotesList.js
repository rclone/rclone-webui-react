import React from 'react';
import "../../utils/Global";
import RemoteListAutoSuggest from "./RemoteListAutoSuggest";
import {connect} from "react-redux";
import {getRemoteNames} from "../../actions/explorerActions";

class RemotesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmpty: false,
            remoteName: props.remoteName
        };
    }

    componentDidMount() {
        // if(this.props.remotes.length < 1 || this.props.hasError)
        this.props.getRemoteNames();
    }

    shouldUpdateRemoteName = (event, {newValue}) => {
        this.setState({remoteName: newValue});

        const {updateRemoteNameHandle} = this.props;
        if (this.props.remotes.indexOf(newValue) !== -1) {
            updateRemoteNameHandle(newValue);
        }
    };


    render() {
        const {isEmpty, remoteName} = this.state;
        const {remotes} = this.props;
        // const {updateRemoteNameHandle} = this.props;

        if (isEmpty) {
            return (
                <div>
                    Add some remotes to see them here <span role="img" aria-label="sheep">🐑</span>.
                </div>);
        } else {

            return (

                <RemoteListAutoSuggest value={remoteName} onChange={this.shouldUpdateRemoteName}
                                       suggestions={remotes}/>
            );
        }
    }
}

const mapStateToProps = state => ({
    remotes: state.remote.remotes,
    hasError: state.remote.hasError,
    error: state.remote.error
});

export default connect(mapStateToProps, {getRemoteNames})(RemotesList);
