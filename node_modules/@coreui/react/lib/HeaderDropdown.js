'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  children: _propTypes2.default.node,
  direction: _propTypes2.default.string
};

var defaultProps = {
  direction: 'down'
};

var AppHeaderDropdown = function (_Component) {
  _inherits(AppHeaderDropdown, _Component);

  function AppHeaderDropdown(props) {
    _classCallCheck(this, AppHeaderDropdown);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.toggle = _this.toggle.bind(_this);
    _this.state = {
      dropdownOpen: false
    };
    return _this;
  }

  AppHeaderDropdown.prototype.toggle = function toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  AppHeaderDropdown.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        attributes = _objectWithoutProperties(_props, ['children']);

    return _react2.default.createElement(
      _reactstrap.Dropdown,
      _extends({ nav: true, isOpen: this.state.dropdownOpen, toggle: this.toggle }, attributes),
      children
    );
  };

  return AppHeaderDropdown;
}(_react.Component);

AppHeaderDropdown.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppHeaderDropdown.defaultProps = defaultProps;

exports.default = AppHeaderDropdown;
module.exports = exports['default'];