import React, {useState} from 'react';
import {
    Button,
    Col,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'reactstrap';
import RemotesList from "../Explorer/RemotesList";
import * as PropTypes from "prop-types"
import {mountOptions, vfsOptions} from "../../utils/MountOptions";
import {isEmpty, validateDuration, validateInt, validateSizeSuffix} from "../../utils/Tools";

const OptionFormInput = ({attr, changeHandler, currentValues, isValidMap, errorsMap}) => {
    const labelValue = `${attr.Name}`;
    const requiredValue = ((attr.Required) ? (<i className={"text-red"}>*</i>) : null);

    const hasExamples = !isEmpty(attr.Examples);
    let examplesMap = null;

    let inputType = "";

    if(attr.Options || inputType === 'options') {
        inputType = "select";
        examplesMap = attr.Options.map(a => (<option key={a.key} value={a.key}>{a.value}</option>));
    } else if (attr.IsPassword) {
        inputType = "password";
    } else if (hasExamples) {
        inputType = "string";
    } else if (attr.Type === "bool") {
        inputType = "select";
        examplesMap = [
            (<option key={1} value={true}>Yes</option>),
            (<option key={2} value={false}>No</option>)
        ];
    } else {
        if (attr.Type === "int") {
            inputType = "number";
        } else if (attr.Type === "string") {
            inputType = "text";
        } else {
            inputType = "text";
        }

    }
    return (
        <FormGroup row>
            <Label for={attr.Name} sm={5}>{labelValue}{requiredValue}</Label>
            <Col sm={7}>
                <Input type={inputType} value={currentValues[attr.Name] || attr.Default }
                       name={attr.Name} valid={isValidMap[attr.Name]} invalid={!isValidMap[attr.Name]}
                       id={attr.Name} onChange={changeHandler} required={attr.Required}>
                    {examplesMap}
                </Input>
                <FormFeedback>{errorsMap[attr.Name]}</FormFeedback>

            </Col>
        </FormGroup>
    );
}


const MountOptions = ({changeHandler, currentValues, isValidMap, errorsMap, options, setCurrentValues}) => {
    const output = [];
    for(const opt in options) {
        if(options.hasOwnProperty(opt)) {
            output.push(<OptionFormInput
                key={opt}
                attr={{Name: opt, ...options[opt]}}
                changeHandler={(e) => {
                    e && e.preventDefault();
                    changeHandler(e, options[opt], currentValues, setCurrentValues);
                }}
                currentValues={currentValues}
                errorsMap={errorsMap}
                isValidMap={isValidMap}/>);
        }
    }
    return output;
}

/**
 * New Mount Modal shows a button for opening a modal for new mount and then executes okHandle when positive
 * button is clicked
 * @param props
 * @returns {*}
 * @constructor
 */
const NewMountModal = (props) => {
    const {
        buttonLabel,
        className,
        okHandle

    } = props;

    const [modal, setModal] = useState(false);

    const [mountFs, setMountFs] = useState("");

    const [mountPoint, setMountPoint] = useState("");

    const [formErrors, setFormErrors] = useState((() => {
        const output = {};
        for(const opt in vfsOptions) {
            output[opt] = "";
        }
        for(const opt in mountOptions) {
            output[opt] = "";
        }
        return output;
    })());

    const [isValid, setIsValid] = useState((() => {
        const output = {};
        for(const opt in vfsOptions) {
            output[opt] = true;
        }
        for(const opt in mountOptions) {
            output[opt] = true;
        }
        return output;
    })());

    const [vfsOptionsValues, setVfsOptionsValues] = useState({});

    const [mountOptionsValues, setMountOptionsValues] = useState({});

    const toggle = () => setModal(!modal);

    const handleCreateMount = () => {
        if (!okHandle) {
            throw new Error("Ok handle is null");
        }

        okHandle(mountFs, mountPoint, vfsOptionsValues, mountOptionsValues);
    }

    const isCreateDisabled = () => {
        return !mountFs || !mountPoint;
    }

    /**
     * Handle init change and set appropriate errors.
     * @param e
     * @param option
     * @param formValues
     * @param setFormValues
     */
    const handleInputChange = (e, option, formValues, setFormValues) => {

        let inputName = e.target.name;
        let inputValue = e.target.value;
        const inputType = option.Type;
        if(inputType === "bool") {
            inputValue = inputValue === "true"
        }else if (inputType === "int") {
            inputValue = parseInt(inputValue);
        }
        setFormValues({
            ...formValues,
            [inputName]: inputValue
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

        if (option.Required && (!inputValue || inputValue === "")) {
            validateResult = false;
            if (!validateResult) {
                error += " This field is required";
            }
        }
        setFormErrors({
            ...formErrors,
            [inputName]: error
        });

        setIsValid({
            ...isValid,
            [inputName]: validateResult
        });
    };

    return (
        <div data-test="newMountModalComponent">
            <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>New Mount</ModalHeader>
                <ModalBody>
                    <FormGroup row>
                        <Label for={"mountFs"} sm={5}>Fs</Label>
                        <Col sm={7}>
                            <RemotesList
                                remoteName={mountFs}
                                handleChangeRemoteName={setMountFs}
                            />
                            <FormFeedback/>
                        </Col>
                    </FormGroup>
                    {mountFs && <FormGroup row>
                        <Label for={"mountPoint"} sm={5}>Mount Point</Label>
                        <Col sm={7}>
                            <Input type={"text"} value={mountPoint}
                                   name={"mountPoint"}
                                   id={"mountPoint"} onChange={e => setMountPoint(e.target.value)} required={true}>

                            </Input>
                            <FormFeedback/>

                        </Col>
                    </FormGroup>}

                    <Row>
                        <Col lg={6}>
                            <p>Mount Options</p>
                            <MountOptions
                                isValidMap={isValid}
                                errorsMap={formErrors}
                                currentValues={mountOptionsValues}
                                setCurrentValues={setMountOptionsValues}
                                changeHandler={handleInputChange}
                                options={mountOptions}
                            />
                        </Col>

                        <Col lg={6}>
                            <p>VFS Options</p>
                            <MountOptions
                                isValidMap={isValid}
                                errorsMap={formErrors}
                                currentValues={vfsOptionsValues}
                                setCurrentValues={setVfsOptionsValues}
                                changeHandler={handleInputChange}
                                options={vfsOptions}
                            />
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button data-test="ok-button" color="primary" onClick={handleCreateMount}
                            disabled={isCreateDisabled()}>Create</Button>{' '}
                    <Button data-test="cancel-button" color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

NewMountModal.propTypes = {
    /**
     * Text for open modal button
     */
    buttonLabel: PropTypes.string,
    /**
     * Class for open modal button
     */
    buttonClass: PropTypes.string,
    /**
     * Function to be called when ok button is clicked.
     */
    okHandle: PropTypes.func.isRequired,
}

export default NewMountModal;