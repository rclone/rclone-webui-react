import React from 'react';
import "../../utils/Global";
import axiosInstance from "../../utils/API";
import {Button, Card, Col, Row} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";

class RemotesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            remotes: [],
            isEmpty: true
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


    render() {
        const {isEmpty, remotes} = this.state;
        const {updateRemoteNameHandle} = this.props;
        if (isEmpty) {
            return (
                <div>
                    Add some remotes to see them here <span role="img" aria-label="sheep">🐑</span>.
                </div>);
        } else {
            let remotesMap = remotes.map((item, idx) => {
                return (
                    <Col key={item} xs={12} sm={6} lg={3}>
                        <Card>
                            <CardBody>
                                <p><strong>Name:</strong> {item} <Button color={"info"}
                                                                         onClick={() => updateRemoteNameHandle(item)}>Open</Button>
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                )
            });
            return (
                <Row>
                    {remotesMap}
                </Row>
            );
        }
    }
}

export default RemotesList;
