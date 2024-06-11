import React, {Component} from 'react';
import {
    Button,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupText,
    Row
} from 'reactstrap';

class Page500 extends Component {
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
              <span className="clearfix">
                <h1 className="float-left display-3 mr-4">500</h1>
                <h4 className="pt-3">Houston, we have a problem!</h4>
                <p className="text-muted float-left">The page you are looking for is temporarily unavailable.</p>
              </span>
                            <InputGroup className="input-prepend">
                                <InputGroupText>
                                    <i className="fa fa-search"></i>
                                </InputGroupText>
                                <Input size="16" type="text" placeholder="What are you looking for?"/>
                                <Button color="info">Search</Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Page500;
