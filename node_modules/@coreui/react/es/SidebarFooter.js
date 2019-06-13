var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

var propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

var defaultProps = {
  tag: 'div'
};

var AppSidebarFooter = function (_Component) {
  _inherits(AppSidebarFooter, _Component);

  function AppSidebarFooter() {
    _classCallCheck(this, AppSidebarFooter);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  AppSidebarFooter.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        Tag = _props.tag,
        attributes = _objectWithoutProperties(_props, ['className', 'children', 'tag']);

    var classes = classNames(className, 'sidebar-footer');
    var footer = children ? React.createElement(
      Tag,
      _extends({ className: classes }, attributes),
      children
    ) : null;

    return footer;
  };

  return AppSidebarFooter;
}(Component);

AppSidebarFooter.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppSidebarFooter.defaultProps = defaultProps;

export default AppSidebarFooter;