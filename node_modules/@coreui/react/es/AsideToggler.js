var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { asideMenuCssClasses, validBreakpoints, checkBreakpoint } from './Shared/index';
import toggleClasses from './Shared/toggle-classes';

var propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultOpen: PropTypes.bool,
  display: PropTypes.any,
  mobile: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  type: PropTypes.string
};

var defaultProps = {
  defaultOpen: false,
  display: 'lg',
  mobile: false,
  tag: 'button',
  type: 'button'
};

var AppAsideToggler = function (_Component) {
  _inherits(AppAsideToggler, _Component);

  function AppAsideToggler(props) {
    _classCallCheck(this, AppAsideToggler);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.asideToggle = _this.asideToggle.bind(_this);

    _this.state = {};
    return _this;
  }

  AppAsideToggler.prototype.componentDidMount = function componentDidMount() {
    this.toggle(this.props.defaultOpen);
  };

  AppAsideToggler.prototype.toggle = function toggle(force) {
    var _ref = [this.props.display, this.props.mobile],
        display = _ref[0],
        mobile = _ref[1];

    var cssClass = asideMenuCssClasses[0];
    if (!mobile && display && checkBreakpoint(display, validBreakpoints)) {
      cssClass = 'aside-menu-' + display + '-show';
    }
    toggleClasses(cssClass, asideMenuCssClasses, force);
  };

  AppAsideToggler.prototype.asideToggle = function asideToggle(e) {
    e.preventDefault();
    this.toggle();
  };

  AppAsideToggler.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        className = _props.className,
        children = _props.children,
        type = _props.type,
        Tag = _props.tag,
        attributes = _objectWithoutProperties(_props, ['className', 'children', 'type', 'tag']);

    delete attributes.defaultOpen;
    delete attributes.display;
    delete attributes.mobile;

    var classes = classNames(className, 'navbar-toggler');

    return React.createElement(
      Tag,
      _extends({
        type: type,
        className: classes
      }, attributes, {
        onClick: function onClick(event) {
          return _this2.asideToggle(event);
        }
      }),
      children || React.createElement('span', { className: 'navbar-toggler-icon' })
    );
  };

  return AppAsideToggler;
}(Component);

AppAsideToggler.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppAsideToggler.defaultProps = defaultProps;

export default AppAsideToggler;