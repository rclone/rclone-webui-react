import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import favicon from '../../assets/img/brand/favicon.png'
import BackendStatusCard from "../../views/Base/BackendStatusCard/BackendStatusCard";

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
    render() {

        // eslint-disable-next-line
        const {children, ...attributes} = this.props;

        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile/>
                <AppNavbarBrand
                    full={{src: logo, width: 89, height: 25, alt: 'CoreUI Logo'}}
                    minimized={{src: favicon, width: 30, height: 30, alt: 'CoreUI Logo'}}
                />
                <AppSidebarToggler className="d-md-down-none" display="lg"/>

                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                    </NavItem>

                </Nav>
                <Nav className="ml-auto" navbar>
                    <BackendStatusCard mode={"button"}/>
                    <NavItem className="d-md-down-none">
                        <NavLink to="#" className="nav-link"><i className="icon-bell"></i>
                            <Badge pill color="danger">5</Badge></NavLink>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
                    </NavItem>
                    <AppHeaderDropdown direction="down">
                        <DropdownToggle nav>
                            <img className="img-avatar"
                                 alt="admin@bootstrapmaster.com"/>
                        </DropdownToggle>
                        <DropdownMenu right style={{right: 'auto'}}>
                            <DropdownItem header tag="div"
                                          className="text-center"><strong>Account</strong></DropdownItem>
                            <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge
                                color="info">42</Badge></DropdownItem>

                        </DropdownMenu>
                    </AppHeaderDropdown>
                </Nav>
                <AppAsideToggler className="d-md-down-none"/>
                {/*<AppAsideToggler className="d-lg-none" mobile />*/}
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
