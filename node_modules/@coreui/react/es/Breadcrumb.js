var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Route, Link, matchPath } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    return matchPath(url, { path: route.path, exact: route.exact });
  });
  return aroute && aroute.name ? aroute.name : null;
};

var BreadcrumbsItem = function BreadcrumbsItem(_ref) {
  var match = _ref.match;

  var routeName = findRouteName(match.url);
  if (routeName) {
    return match.isExact ? React.createElement(
      BreadcrumbItem,
      { active: true },
      routeName
    ) : React.createElement(
      BreadcrumbItem,
      null,
      React.createElement(
        Link,
        { to: match.url || '' },
        routeName
      )
    );
  }
  return null;
};

BreadcrumbsItem.propTypes = process.env.NODE_ENV !== "production" ? {
  match: PropTypes.shape({
    url: PropTypes.string
  })
} : {};

var Breadcrumbs = function Breadcrumbs(args) {
  var paths = getPaths(args.location.pathname);
  var items = paths.map(function (path, i) {
    return React.createElement(Route, { key: i.toString(), path: path, component: BreadcrumbsItem });
  });
  return React.createElement(
    Breadcrumb,
    null,
    items
  );
};

var propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  appRoutes: PropTypes.any,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
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

    var classes = classNames(className);

    return React.createElement(
      Tag,
      { className: classes },
      React.createElement(Route, _extends({ path: '/:path', component: Breadcrumbs }, attributes))
    );
  };

  return AppBreadcrumb;
}(Component);

AppBreadcrumb.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppBreadcrumb.defaultProps = defaultProps;

export default AppBreadcrumb;