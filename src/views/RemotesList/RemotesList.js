import React from 'react';
import "../../utils/Global";
import axiosInstance from "../../utils/API";
import RemoteListAutoSuggest from "./RemoteListAutoSuggest";

class RemotesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            remotes: [],
            isEmpty: true,
            remoteName: props.remoteName
        };
    }

    async updateRemoteList() {
        /*
        {
            "remotes": [
                "eventsfunk",
                "mydrive"
            ]
        }
        */
        try {
            let res = await axiosInstance.post("/config/listremotes");
            // console.log("Remote list response:");
            // console.log(res, res.data.remotes.length);
            if (res.data.remotes.length === 0) {
                this.setState({isEmpty: true});
            } else {
                this.setState({remotes: res.data.remotes, isEmpty: false});
            }

        } catch (e) {
            console.log(`Error loading remotes: ${e}`)
        }
    }

    componentDidMount() {
        // TODO: Get remote List via config/listremotes
        this.updateRemoteList();
    }

    shouldUpdateRemoteName = (event, {newValue}) => {
        this.setState({remoteName: newValue});

        const {updateRemoteNameHandle} = this.props;
        if (this.state.remotes.indexOf(newValue) !== -1) {
            updateRemoteNameHandle(newValue);
        }
    };


    render() {
        const {isEmpty, remotes, remoteName} = this.state;
        const {updateRemoteNameHandle} = this.props;

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

export default RemotesList;
