var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

var propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
  className: PropTypes.string,
  brand: PropTypes.any,
  full: PropTypes.any,
  minimized: PropTypes.any
};

var defaultProps = {
  tag: 'a'
};

var AppNavbarBrand = function (_Component) {
  _inherits(AppNavbarBrand, _Component);

  function AppNavbarBrand() {
    _classCallCheck(this, AppNavbarBrand);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  AppNavbarBrand.prototype.imgSrc = function imgSrc(brand) {
    return brand.src ? brand.src : '';
  };

  AppNavbarBrand.prototype.imgWidth = function imgWidth(brand) {
    return brand.width ? brand.width : 'auto';
  };

  AppNavbarBrand.prototype.imgHeight = function imgHeight(brand) {
    return brand.height ? brand.height : 'auto';
  };

  AppNavbarBrand.prototype.imgAlt = function imgAlt(brand) {
    return brand.alt ? brand.alt : '';
  };

  AppNavbarBrand.prototype.navbarBrandImg = function navbarBrandImg(props, classBrand, key) {
    return React.createElement('img', {
      src: this.imgSrc(props),
      width: this.imgWidth(props),
      height: this.imgHeight(props),
      alt: this.imgAlt(props),
      className: classBrand,
      key: key.toString()
    });
  };

  AppNavbarBrand.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        Tag = _props.tag,
        attributes = _objectWithoutProperties(_props, ['className', 'children', 'tag']);

    var classes = classNames(className, 'navbar-brand');

    var img = [];
    if (this.props.brand) {
      var props = this.props.brand;
      var classBrand = 'navbar-brand';
      img.push(this.navbarBrandImg(props, classBrand, img.length + 1));
    }
    if (this.props.full) {
      var _props2 = this.props.full;
      var _classBrand = 'navbar-brand-full';
      img.push(this.navbarBrandImg(_props2, _classBrand, img.length + 1));
    }
    if (this.props.minimized) {
      var _props3 = this.props.minimized;
      var _classBrand2 = 'navbar-brand-minimized';
      img.push(this.navbarBrandImg(_props3, _classBrand2, img.length + 1));
    }

    return React.createElement(
      Tag,
      _extends({}, attributes, { className: classes }),
      children || img
    );
  };

  return AppNavbarBrand;
}(Component);

AppNavbarBrand.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AppNavbarBrand.defaultProps = defaultProps;

export default AppNavbarBrand;