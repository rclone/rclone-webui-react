'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Shared = require('./Shared');

var _toggleClasses = require('./Shared/toggle-classes');

var _toggleClasses2 = _interopRequireDefault(_toggleClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  display: _propTypes2.default.string,
  fixed: _propTypes2.default.bool,
  isOpen: _propTypes2.default.bool,
  offCanvas: _propTypes2.default.bool,
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string])
};

var defaultProps = {
  tag: 'aside',
  display: '',
  fixed: false,
  isOpen: false,
  offCanvas: true
};

var AppAside = function (_Component) {
  _inherits(AppAside, _Component);

  function AppAside(props) {
    _classCallCheck(this, AppAside);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.isFixed = _this.isFixed.bind(_this);
    _this.isOffCanvas = _this.isOffCanvas.bind(_this);
    _this.displayBreakpoint = _this.displayBreakpoint.bind(_this);
    return _this;
  }

  AppAside.prototype.componentDidMount = function componentDidMount() {
    this.isFixed(this.props.fixed);
    this.isOffCanvas(this.props.offCanvas);
    this.displayBreakpoint(this.props.display);
  };

  AppAside.prototype.isFixed = function isFixed(fixed) {
    if (fixed) {
      document.body.classList.add('aside-menu-fixed');
    }
  };

  AppAside.prototype.isOffCanvas = function isOffCanvas(offCanvas) {
    if (offCanvas) {
      document.body.classList.add('aside-menu-off-canvas');
    }
  };

  AppAside.prototype.displayBreakpoint = function displayBreakpoint(display) {
    if (display && (0, _Shared.checkBreakpoint)(display, _Shared.validBreakpoints)) {
      var cssClass = 'aside-menu-' + display + '-show';
      (0, _toggleClasses2.default)(cssClass, _Shared.asideMenuCssClasses, true);
    }
  };

  AppAside.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        Tag = _props.tag,
        attributes = _objectWithoutProperties(_props, ['className', 'children', 'tag']);

    delete attributes.display;
    delete attributes.fixed;
    delete attributes.offCanvas;
    delete attributes.isOpen;

    var classes = (0, _classnames2.default)(className, 'aside-menu');

    return _react2.default.createElement(
      Tag,
      _extends({}, attributes, { className: classes }),
      children
    );
  };

  return AppAside;
}(_react.Component);

AppAside.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppAside.defaultProps = defaultProps;

exports.default = AppAside;
module.exports = exports['default'];