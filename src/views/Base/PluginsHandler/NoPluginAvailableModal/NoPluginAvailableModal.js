import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import * as PropTypes from 'prop-types';

const NoPluginAvailableModal = (props) => {

    const {
        className,
        isOpen,
        setIsOpen,
        availablePlugins,
        processOpenPlugin
    } = props;


    const toggle = () => {
        setIsOpen(!isOpen);
    }


    const openPlugin = (plugin) => {
        processOpenPlugin(plugin.name, plugin.author);
    }

    return (<div data-test="noPluginAvailableModal">
        <Modal isOpen={isOpen} toggle={toggle} className={className}>
            <ModalHeader toggle={setIsOpen}>Couldn't find a plugin to open this file</ModalHeader>
            <ModalBody>
                <Table responsive className="table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        !availablePlugins || availablePlugins.length <= 0 ?
                            <p className="p-3">Can't find a plugin to open this file. Go to the store and install
                                some!</p> :
                            availablePlugins.map((value, i) =>
                                <tr key={value.name}>
                                    <td>{value.name}</td>
                                    <td>{value.author}</td>
                                    <td>{value.description}</td>
                                    <td>
                                        <Button color="link" onClick={() => openPlugin(value)}> <i
                                            className="fa fa-lg fa-link"/></Button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </Table>

            </ModalBody>
            <ModalFooter>
                <Button data-test="ok-button" color="primary">Go to Store</Button>{' '}
                <Button data-test="cancel-button" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </div>);
}

NoPluginAvailableModal.propTypes = {
    className: PropTypes.string.isRequired,
    availablePlugins: PropTypes.array.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    processOpenPlugin: PropTypes.func.isRequired
}

export default NoPluginAvailableModal;