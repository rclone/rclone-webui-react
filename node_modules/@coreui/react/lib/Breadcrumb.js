'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactstrap = require('reactstrap');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var routes = void 0;

var getPaths = function getPaths(pathname) {
  var paths = ['/'];

  if (pathname === '/') return paths;

  pathname.split('/').reduce(function (prev, curr) {
    var currPath = prev + '/' + curr;
    paths.push(currPath);
    return currPath;
  });
  return paths;
};

var findRouteName = function findRouteName(url) {
  var aroute = routes.find(function (route) {
    return (0, _reactRouterDom.matchPath)(url, { path: route.path, exact: route.exact });
  });
  return aroute && aroute.name ? aroute.name : null;
};

var BreadcrumbsItem = function BreadcrumbsItem(_ref) {
  var match = _ref.match;

  var routeName = findRouteName(match.url);
  if (routeName) {
    return match.isExact ? _react2.default.createElement(
      _reactstrap.BreadcrumbItem,
      { active: true },
      routeName
    ) : _react2.default.createElement(
      _reactstrap.BreadcrumbItem,
      null,
      _react2.default.createElement(
        _reactRouterDom.Link,
        { to: match.url || '' },
        routeName
      )
    );
  }
  return null;
};

BreadcrumbsItem.propTypes = process.env.NODE_ENV !== "production" ? {
  match: _propTypes2.default.shape({
    url: _propTypes2.default.string
  })
} : {};

var Breadcrumbs = function Breadcrumbs(args) {
  var paths = getPaths(args.location.pathname);
  var items = paths.map(function (path, i) {
    return _react2.default.createElement(_reactRouterDom.Route, { key: i.toString(), path: path, component: BreadcrumbsItem });
  });
  return _react2.default.createElement(
    _reactstrap.Breadcrumb,
    null,
    items
  );
};

var propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  appRoutes: _propTypes2.default.any,
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string])
};

var defaultProps = {
  tag: 'div',
  className: '',
  appRoutes: [{ path: '/', exact: true, name: 'Home', component: null }]
};

var AppBreadcrumb = function (_Component) {
  _inherits(AppBreadcrumb, _Component);

  function AppBreadcrumb(props) {
    _classCallCheck(this, AppBreadcrumb);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = { routes: props.appRoutes };
    routes = _this.state.routes;
    return _this;
  }

  AppBreadcrumb.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        Tag = _props.tag,
        attributes = _objectWithoutProperties(_props, ['className', 'tag']);

    delete attributes.children;
    delete attributes.appRoutes;

    var classes = (0, _classnames2.default)(className);

    return _react2.default.createElement(
      Tag,
      { className: classes },
      _react2.default.createElement(_reactRouterDom.Route, _extends({ path: '/:path', component: Breadcrumbs }, attributes))
    );
  };

  return AppBreadcrumb;
}(_react.Component);

AppBreadcrumb.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppBreadcrumb.defaultProps = defaultProps;

exports.default = AppBreadcrumb;
module.exports = exports['default'];