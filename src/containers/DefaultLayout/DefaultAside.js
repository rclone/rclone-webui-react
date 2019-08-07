import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {

        // eslint-disable-next-line
        const {children, ...attributes} = this.props;

        return (
            <React.Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '1'})}
                                 onClick={() => {
                                     this.toggle('1');
                                 }}>
                            <i className="icon-list"></i>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '2'})}
                                 onClick={() => {
                                     this.toggle('2');
                                 }}>
                            <i className="icon-speech"></i>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '3'})}
                                 onClick={() => {
                                     this.toggle('3');
                                 }}>
                            <i className="icon-settings"></i>
                        </NavLink>
                    </NavItem>
                </Nav>

            </React.Fragment>
        );
    }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
