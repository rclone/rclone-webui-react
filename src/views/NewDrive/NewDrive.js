import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Form, FormGroup, Input, Label} from "reactstrap";

import {config} from "./config.js";
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';

function DriveParameters({driveType, loadAdvanced, changeHandler, currentValues}) {
    if (driveType !== undefined && driveType !== "") {
        const inputsMap = config[driveType].Options;
        console.log("current values" + currentValues);

        let outputMap = inputsMap.map((attr, idx) => {
            if ((loadAdvanced && attr.Advanced) || (!loadAdvanced && !attr.Advanced)) {
                return (
                    <FormGroup key={idx} row>
                        <Label for={attr.Name} sm={5}>{attr.Help}</Label>
                        <Col sm={7}>
                            <Input type={attr.IsPassword ? "password" : "text"} value={currentValues[attr.Name]}
                                   name={attr.Name}
                                   id={attr.Name} onChange={changeHandler}/>
                        </Col>
                    </FormGroup>
                );
            } else {
                return null;
            }
        });
        return outputMap;
    }
    return (
        <div>Select a drive type to continue</div>
    );
}

function DriveTypes(props) {
    let configMap = config.map((drive, idx) => (
        <option key={idx} value={idx}>{drive.Description}</option>
    ));

    return configMap;

}

function CustomInput({key, id, label, changeHandler, type, value, name, placeholder}) {
    return (
        <FormGroup key={key} row>
            <Label for={id} sm={5}>{label}</Label>
            <Col sm={7}>
                <Input type={type} value={value} name={name} placeholder={placeholder}
                       id={id} onChange={changeHandler}/>
            </Col>
        </FormGroup>);
}


class NewDrive extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {

            colRconfig: true,
            colSetup: false,
            colAdvanced: false,
            driveName: "",


            advancedOptions: false,
            formValues: {},


            driveType: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle = (e) => {
        let name = e.target.name;
        console.log("Name:" + name);

        this.setState({[name]: !this.state[name]})
    };

    handleInputChange = (e) => {
        let new_prod_diff = cloneDeep(this.state.formValues);
        new_prod_diff[e.target.name] = e.target.value;
        this.setState({formValues: new_prod_diff});

    };

    changeDriveType = (e) => {
        e.preventDefault();

        let val = e.target.value;

        let availableOptions = {};
        let drivePrefix = "";
        // console.log(config[val].Options);
        if (val !== undefined && val !== "") {

            config[val].Options.forEach(item => {
                availableOptions[item.Name] = item.Default;
            });
            drivePrefix = config[val].Prefix;
        }

        this.setState({driveType: val, drivePrefix: drivePrefix, formValues: availableOptions},
            (prevState) => {
                console.log(config[this.state.driveType]);
            });


    };

    openSetupDrive = (e) => {
        e.preventDefault();
        this.setState({'colSetup': true})
        this.setupDriveDiv.scrollIntoView({behavior: "smooth"});
    };

    editAdvancedOptions = (e) => {
        this.setState({advancedOptions: !this.state.advancedOptions});
        // console.log(e.target.value);
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log("Submitted form");
        const headers = {
            headers: {'Content-Type': 'application/json'}
        };
        let data = {parameters: this.state.formValues, name: this.state.driveName, type: this.state.drivePrefix};

        axios.post('http://localhost:5572/config/create', data, headers).then(function (response) {
            console.log(response.data); // ex.: { user: 'Your User'}
            console.log(response.status); // ex.: 200
        });
    }

    changeName = e => {
        this.setState({driveName: e.target.value})
    };

    openAdvancedSettings = e => {
        if (this.state.advancedOptions) {
            this.setState({colAdvanced: true});
        } else {
            this.configEndDiv.scrollIntoView({behavior: "smooth"});
        }
    };


    render() {
        const {colRconfig, colSetup, colAdvanced, driveType, advancedOptions} = this.state;
        const {driveName} = this.state;
        return (
            <div>
                <p>This 3 step process will guide you through creating a new config. If you want </p>
                <Form onSubmit={this.handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h5>
                                <Button color="link" name="colRconfig" onClick={this.toggle}
                                        style={{marginBottom: '1rem'}}><strong>Step 1:</strong> Remote Config</Button>
                            </h5>

                        </CardHeader>
                        <Collapse isOpen={colRconfig}>

                            <CardBody>
                                <CustomInput label="Name of this drive (For your reference)"
                                             changeHandler={this.changeName} value={driveName}
                                             placeholder={"Enter a name"} name="name" id="driveName"/>

                                <FormGroup row>
                                    <Label for="driveType" sm={5}>Select</Label>
                                    <Col sm={7}>
                                        <Input type="select" name="type" id="driveType" value={driveType}
                                               onChange={this.changeDriveType}>
                                            <option value="">Select one</option>
                                            <DriveTypes/>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={3}>
                                        <Label for="inputDriveName">Docs are available at </Label>{' '}
                                        <a href="https://rclone.org/commands/rclone_config/">Rclone Config</a>
                                    </Col>


                                </FormGroup>
                            </CardBody>

                            <CardFooter>
                                <div className="clearfix">
                                    <Button color="success" className="float-right" onClick={this.openSetupDrive}><i
                                        className="fa fa-check fa-lg "/></Button>
                                </div>
                            </CardFooter>

                        </Collapse>
                    </Card>
                    <Card>
                        {/*div for Scrolling to here*/}
                        <div ref={(el) => this.setupDriveDiv = el}/>
                        <CardHeader>
                            <h5>
                                <Button color="link" name="colSetup" onClick={this.toggle}
                                        style={{marginBottom: '1rem'}}><strong>Step 2:</strong> Setup Drive</Button>
                            </h5>

                        </CardHeader>
                        <Collapse isOpen={colSetup}>

                            <CardBody>
                                <DriveParameters driveType={driveType} loadAdvanced={false}
                                                 changeHandler={this.handleInputChange}
                                                 currentValues={this.state.formValues}/>
                            </CardBody>
                            <CardFooter>
                                <div className="clearfix">
                                    <div className="float-right">
                                        <Input type="checkbox" value={advancedOptions}
                                               onChange={this.editAdvancedOptions}/><span className="mr-3">Edit Advanced Options</span>
                                        <Button color="success" onClick={this.openAdvancedSettings}><i
                                            className="fa fa-check fa-lg "/></Button>

                                    </div>
                                </div>
                            </CardFooter>

                        </Collapse>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h5>
                                <Button color="link" name="colAdvanced" onClick={this.toggle}
                                        style={{marginBottom: '1rem'}}><strong>Step 3:</strong> Advanced
                                    (optional)</Button>

                            </h5>

                        </CardHeader>
                        <Collapse isOpen={colAdvanced}>

                            <CardBody>
                                <DriveParameters driveType={driveType} loadAdvanced={true}
                                                 changeHandler={this.handleInputChange}
                                                 currentValues={this.state.formValues}/>
                            </CardBody>
                            <CardFooter>
                                <div className="clearfix">
                                    <Button color="success" className="float-right"><i className="fa fa-check fa-lg "/></Button>
                                </div>
                            </CardFooter>

                        </Collapse>
                    </Card>
                    <div className="clearfix" ref={(el) => {
                        this.configEndDiv = el
                    }}>
                        <div className="float-right mb-3">
                            <Button color="success" type="submit">Create Config</Button>

                        </div>
                    </div>
                </Form>
            </div>);
    }
}

export default NewDrive;
