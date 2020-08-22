import React from 'react';
import {connect} from "react-redux";
import {Button, Col, Form, Input, InputGroup, InputGroupAddon, Row,} from "reactstrap";
import * as PropTypes from 'prop-types';
import {addPlugin, getPlugins} from "../../actions/pluginActions";
import axios from "axios";
import PluginPlaceHolderCard from "./PluginPlaceHolderCard";
import {toast} from "react-toastify";

class StoreDashboard extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            pluginsList: [],
            searchQuery: ""
        }
    }

    getOfficialPlugins() {
        const url = "https://raw.githubusercontent.com/rclone/rclone-plugins-repo/master/official.json";

        axios.get(url).then(res => {
            this.setState({pluginsList: res.data.plugins});
        }, err => {
            toast.error("Couldn't load plugins " + err.data)
        })
    }

    componentDidMount() {
        // const {pluginsList} = this.state;
        // If plugins list is not valid, download it.
        // if(!pluginsList)
        this.getOfficialPlugins();
    }

    render() {
        const {pluginsList, searchQuery} = this.state;
        if (pluginsList.length <= 0) {
            return (<p>Loading</p>)
        }
        const filteredList = pluginsList ? pluginsList.filter(element => {
            return (
                element.name.toLowerCase().includes(searchQuery) ||
                element.description.toLowerCase().includes(searchQuery) ||
                element.longDescription.toLowerCase().includes(searchQuery) ||
                element.author.toLowerCase().includes(searchQuery)
            );
        }) : [];
        return (
            <div data-test="storeDashboardComponent">
                <Row>
                    <Col lg={12} className="mb-4 d-flex justify-content-between">
                        <Button color="secondary" onClick={() => this.props.history.goBack()}>Back</Button>
                        <Form inline onSubmit={(e) => e.preventDefault()}>
                            <InputGroup>
                                <Input placeholder="Type to start searching" type="text" value={searchQuery}
                                       onChange={(e) => this.setState({searchQuery: e.target.value})}/>
                                <InputGroupAddon addonType="append"><Button color="primary"><span
                                    className="fa fa-search"/></Button></InputGroupAddon>
                            </InputGroup>


                        </Form>
                    </Col>
                </Row>
                <Row>
                    {
                        filteredList.map((e) =>
                            <Col lg={6} key={e.name}>
                                <PluginPlaceHolderCard plugin={e}/>
                            </Col>
                        )
                    }
                </Row>
            </div>);
    }
}

const mapStateToProps = state => ({
    loadedPlugins: state.plugins.loadedPlugins,
});

StoreDashboard.propTypes = {
    loadedPlugins: PropTypes.object.isRequired,

    getPlugins: PropTypes.func.isRequired,

    addPlugin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {getPlugins, addPlugin})(StoreDashboard);
