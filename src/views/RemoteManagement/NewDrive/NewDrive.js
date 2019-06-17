import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label
} from "reactstrap";
// import {config} from "./config.js";
import NewDriveAuthModal from "../../Base/NewDriveAuthModal";
import axiosInstance from "../../../utils/API/API";
import isEmpty, {findFromConfig, validateDuration, validateInt, validateSizeSuffix} from "../../../utils/Tools";
import ProviderAutoSuggest from "./ProviderAutoSuggest";
import {toast} from "react-toastify";
import PropTypes from 'prop-types';
import {getProviders} from "../../../actions/configActions";
import {connect} from "react-redux";

function DriveParameters({drivePrefix, loadAdvanced, changeHandler, currentValues, isValidMap, errorsMap, config}) {
    if (drivePrefix !== undefined && drivePrefix !== "") {
        const currentProvider = findFromConfig(config, drivePrefix);
        let outputMap = [];
        if (currentProvider !== undefined) {
            const inputsMap = currentProvider.Options;

            // console.log("current values" + currentValues);

            /* Options format is as follows
            {
                        "Advanced": true,
                        "Default": -1,
                        "DefaultStr": "off",
                        "Help": "If Object's are greater, use drive v2 API to download.",
                        "Hide": 0,
                        "IsPassword": false,
                        "Name": "v2_download_min_size",
                        "NoPrefix": false,
                        "Provider": "",
                        "Required": false,
                        "ShortOpt": "",
                        "Type": "SizeSuffix",
                        "Value": null,
                        "ValueStr": "off"
                    },

            */

            outputMap = inputsMap.map((attr, idx) => {
                if (attr.Hide === 0 && ((loadAdvanced && attr.Advanced) || (!loadAdvanced && !attr.Advanced))) {
                    const labelValue = `${attr.Help}`;
                    const requiredValue = ((attr.Required) ? (<i className={"text-red"}>*</i>) : null);

                    const hasExamples = !isEmpty(attr.Examples);
                    let examplesMap = null;

                    let inputType = "";


                    if (attr.IsPassword) {
                        inputType = "password";
                    } else if (hasExamples) {
                        inputType = "string";
                        // examplesMap = attr.Examples.map((ex1, id1) => {
                        //     return (<option key={"option" + id1} value={ex1.Value}>{ex1.Help}</option>);
                        // })
                    } else if (attr.Type === "bool") {
                        inputType = "select";
                        examplesMap = [
                            (<option key={1} value={true}>Yes</option>),
                            (<option key={2} value={false}>No</option>)
                        ];
                    } else {
                        // TODO: Write logic for SizeSuffix, Duration, int
                        if (attr.Type === "int") {
                            inputType = "number";
                        } else if (attr.Type === "string") {
                            inputType = "text";
                        } else {
                            inputType = "text";
                        }

                    }
                    return (
                        <FormGroup key={idx} row>
                            <Label for={attr.Name} sm={5}>{labelValue}{requiredValue}</Label>
                            <Col sm={7}>
                                <Input type={inputType} value={currentValues[attr.Name]}
                                       name={attr.Name} valid={isValidMap[attr.Name]} invalid={!isValidMap[attr.Name]}
                                       id={attr.Name} onChange={changeHandler} required={attr.Required}>
                                    {examplesMap}
                                </Input>
                                <FormFeedback>{errorsMap[attr.Name]}</FormFeedback>

                            </Col>
                        </FormGroup>
                    );
                } else {
                    return null;
                }
            });
        }
        return outputMap;
    }
    return (
        <div>Select a drive type to continue</div>
    );
}

// function DriveTypes({config}) {
//     // console.log(config);
//     let configMap = config.map((drive, idx) => (
//         <option key={drive.Prefix} value={idx}>{drive.Description}</option>
//     ));
//     return configMap;
// }

function CustomInput({key, id, label, changeHandler, type, value, name, placeholder, isValid = false}) {
    return (
        <FormGroup key={key} row>
            <Label for={id} sm={5}>{label}</Label>
            <Col sm={7}>
                <Input type={type} value={value} name={name} placeholder={placeholder}
                       id={id} onChange={changeHandler} valid={isValid} invalid={!isValid} required/>
                <FormFeedback valid>Sweet! that name is available</FormFeedback>
                <FormFeedback>Sad! That name is already assigned or empty</FormFeedback>
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
            formValuesValid: {},
            required: {},
            authModalIsVisible: false,

            drivePrefix: "",
            driveNameIsValid: false,
            formErrors: {driveName: ""},
            optionTypes: {},
            isValid: {},

        };
        this.configCheckInterval = null;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleAuthModal = this.toggleAuthModal.bind(this);
        this.startAuthentication = this.startAuthentication.bind(this);
        this.checkConfigStatus = this.checkConfigStatus.bind(this);
    }

    toggle = (e) => {
        let name = e.target.name;

        this.setState({[name]: !this.state[name]})
    };

    // Returns true or false based on whether the config is created
    async checkConfigStatus() {
        const {driveName} = this.state;

        try {
            let res = await axiosInstance.post("/config/get", {name: driveName});
            console.log(res);

            if (!isEmpty(res.data)) {
                // Config is created, clear the interval and hide modal
                clearInterval(this.configCheckInterval);
                this.configCheckInterval = null;
                this.toggleAuthModal();
                this.props.history.push('/dashboard');

            }
        } catch (e) {
            console.log(`Error occurred while checking for config: ${e}`);
            toast.error(`Error creating config. ${e}`, {
                autoClose: false
            });
        }
    }

    handleInputChange = (e) => {

        let inputName = e.target.name;
        let inputValue = e.target.value;
        const inputType = this.state.optionTypes[inputName];
        this.setState({
            formValues: {
                ...this.state.formValues,
                [inputName]: inputValue
            }
        });
        let validateResult = true;
        let error = "";
        if (inputType === "SizeSuffix") {
            validateResult = validateSizeSuffix(inputValue);
            if (!validateResult) {
                error = "The valid input is size( off | {unit}{metric} eg: 10G, 100M, 10G100M etc.)"
            }
        } else if (inputType === "Duration") {
            validateResult = validateDuration(inputValue);
            if (!validateResult) {
                error = "The valid input is time ({unit}{metric} eg: 10ms, 100m, 10h15ms etc.)"
            }
        } else if (inputType === "int") {
            validateResult = validateInt(inputValue);
            if (!validateResult) {
                error = "The valid input is int (100,200,300 etc)"
            }
        }

        if (this.state.required[inputName] && (!inputValue || inputValue === "")) {
            validateResult = false;
            if (!validateResult) {
                error += " This field is required";
            }
        }


        this.setState((prevState) => {
            return {
                isValid: {
                    ...prevState.isValid,
                    [inputName]: validateResult
                },
                formErrors: {
                    ...prevState.formErrors,
                    [inputName]: error
                },
            }
        });



    };

    // Update the driveType and then load the equivalent input parameters for that drive
    changeDriveType = (event, {newValue}) => {

        const {providers} = this.props;

        let val = newValue;


        let availableOptions = {};
        let optionTypes = {};
        let isValid = {};
        let formErrors = {};
        let required = {};
        // let drivePrefix = "";
        // console.log("driveType change", val);
        if (val !== undefined && val !== "") {

            const currentConfig = findFromConfig(providers, val);
            if (currentConfig !== undefined) {

                currentConfig.Options.forEach(item => {

                    const {DefaultStr, Type, Name, Required, Hide} = item;
                    if (Hide === 0) {
                        availableOptions[Name] = DefaultStr;
                        optionTypes[Name] = Type;
                        required[Name] = Required;

                        if (Required && (!DefaultStr || DefaultStr === ""))
                            isValid[Name] = false;
                        else
                            isValid[Name] = true;
                        formErrors[Name] = "";
                    }
                });
            }
            this.setState({
                drivePrefix: val,
                formValues: availableOptions,
                optionTypes: optionTypes,
                isValid: isValid,
                formErrors: formErrors,
                required: required
            });
        } else {
            this.setState({drivePrefix: val})

        }




    };

    // Open second step of setting up the drive
    openSetupDrive = (e) => {
        if (e) e.preventDefault();
        this.setState({'colSetup': true});
        this.setupDriveDiv.scrollIntoView({behavior: "smooth"});
    };

    // Decide whether to use advanced options
    editAdvancedOptions = (e) => {
        this.setState({advancedOptions: !this.state.advancedOptions});
    };

    validateForm() {
        //    Validate driveName and other parameters
        const {driveNameIsValid, drivePrefix, isValid} = this.state;
        let flag = true;

        if (!driveNameIsValid) {
            flag = false;
        }
        if (drivePrefix === "") {
            flag = false;
        }


        /*Check for validations based on inputType*/
        for (const [key, value] of Object.entries(isValid)) {
            if (!key || !value) {
                flag = false;
                break;
            }
        }

        return flag;
    }

    toggleAuthModal() {
        this.setState((state, props) => {
            return {authModalIsVisible: !state.authModalIsVisible}
        });
    }

    startAuthentication() {
        this.toggleAuthModal();
        // Check every second if the config is created
        if (this.configCheckInterval === null) {
            this.configCheckInterval = setInterval(this.checkConfigStatus, 1000);
        } else {
            console.error("Interval already running. Should not start a new one");
        }

    }

    stopAuthentication() {
        this.setState((state, props) => {
            return {authModalIsVisible: false}
        });
        clearInterval(this.configCheckInterval);

    }


    async handleSubmit(e) {
        e.preventDefault();
        console.log("Submitted form");

        const {formValues, drivePrefix} = this.state;
        const {providers} = this.props;


        if (this.validateForm()) {

            if (drivePrefix !== undefined && drivePrefix !== "") {
                const currentProvider = findFromConfig(providers, drivePrefix);
                if (currentProvider !== undefined) {


                    const defaults = currentProvider.Options;

                    // console.log(config, formValues, defaults);

                    let finalParameterValues = {};


                    for (const [key, value] of Object.entries(formValues)) {

                        const defaultValueObj = defaults.find((ele, idx, array) => {
                            return (key === ele.Name);
                        });

                        const {DefaultStr} = defaultValueObj;
                        if (value !== DefaultStr) {
                            console.log(`${value} !== ${DefaultStr}`);
                            finalParameterValues[key] = value;
                        }

                    }


                    let data = {
                        parameters: finalParameterValues,

                        name: this.state.driveName,
                        type: this.state.drivePrefix
                    };


                    console.log("Validated form");
                    this.startAuthentication();
                    try {
                        await axiosInstance.post('/config/create', data);
                        toast.info("Config created");

                    } catch (err) {
                        toast.error(`Error creating config. ${err}`, {
                            autoClose: false
                        });
                        this.stopAuthentication();
                    }

                }
            }
        } else {
            if (!this.state.colSetup) {
                this.openSetupDrive();
            }

            if (this.state.advancedOptions && !this.state.colAdvanced) {
                this.openAdvancedSettings();
            }
            toast.warn(`Check for errors before submitting.`, {
                autoClose: false
            });
        }
    }

    clearForm = e => {
        this.setState({driveName: "", drivePrefix: ""})
    };



    changeName = e => {
        const value = e.target.value;

        this.setState({driveName: value}, () => {

            if (value === undefined || value === "") {
                this.setState({driveNameIsValid: false});
            } else {

                axiosInstance.post('/config/get', {name: value}).then((response) => {
                    let errors = this.state.formErrors;
                    let isValid = isEmpty(response.data);
                    if (isValid) {
                        errors["driveName"] = "";
                    } else {
                        errors["driveName"] = "Duplicate";

                    }
                    this.setState({formErrors: errors, driveNameIsValid: isValid});
                });
            }

        });
    };

    openAdvancedSettings = e => {
        if (this.state.advancedOptions) {
            this.setState({colAdvanced: true});
        } else {
            this.configEndDiv.scrollIntoView({behavior: "smooth"});
        }
    };



    componentDidMount() {
        if (!this.props.providers || this.props.providers.length < 1)
            this.props.getProviders();
    }


    componentWillUnmount() {
        clearInterval(this.configCheckInterval);
        this.configCheckInterval = null;
    }

    render() {
        const {colRconfig, colSetup, colAdvanced, drivePrefix, advancedOptions, driveName, driveNameIsValid} = this.state;
        const {providers} = this.props;
        // console.log("config", config);
        return (
            <div>
                <p>This 3 step process will guide you through creating a new config. For auto config, leave the
                    parameters as is.</p>
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
                                             placeholder={"Enter a name"} name="name" id="driveName"
                                             isValid={driveNameIsValid}/>

                                <FormGroup row>
                                    <Label for="driveType" sm={5}>Select</Label>
                                    <Col sm={7}>
                                        <ProviderAutoSuggest suggestions={providers} value={drivePrefix}
                                                             onChange={this.changeDriveType}/>
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
                                <DriveParameters drivePrefix={drivePrefix} loadAdvanced={false}
                                                 changeHandler={this.handleInputChange}
                                                 errorsMap={this.state.formErrors}
                                                 isValidMap={this.state.isValid}
                                                 currentValues={this.state.formValues} config={providers}/>
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
                                <DriveParameters drivePrefix={drivePrefix} loadAdvanced={true}
                                                 changeHandler={this.handleInputChange}
                                                 errorsMap={this.state.formErrors}
                                                 isValidMap={this.state.isValid}
                                                 currentValues={this.state.formValues} config={providers}/>
                            </CardBody>

                        </Collapse>
                    </Card>
                    <div className="clearfix" ref={(el) => {
                        this.configEndDiv = el
                    }}>
                        <div className="float-right mb-3">
                            <Button color="info" type="reset" onClick={() => this.clearForm()}>Clear</Button>
                            <Button color="success" type="submit">Create Config</Button>

                        </div>
                    </div>
                </Form>
                <NewDriveAuthModal isVisible={this.state.authModalIsVisible} closeModal={this.toggleAuthModal}/>
            </div>);
    }
}

const mapStateToProps = state => ({
    providers: state.config.providers
});

NewDrive.propTypes = {
    providers: PropTypes.array.isRequired,
    getProviders: PropTypes.func.isRequired

};

export default connect(mapStateToProps, {getProviders})(NewDrive);
