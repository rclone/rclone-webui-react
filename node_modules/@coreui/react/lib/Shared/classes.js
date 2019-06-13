'use strict';

exports.__esModule = true;
exports.checkBreakpoint = checkBreakpoint;
var sidebarCssClasses = exports.sidebarCssClasses = ['sidebar-show', 'sidebar-sm-show', 'sidebar-md-show', 'sidebar-lg-show', 'sidebar-xl-show'];

var asideMenuCssClasses = exports.asideMenuCssClasses = ['aside-menu-show', 'aside-menu-sm-show', 'aside-menu-md-show', 'aside-menu-lg-show', 'aside-menu-xl-show'];

var validBreakpoints = exports.validBreakpoints = ['sm', 'md', 'lg', 'xl'];

function checkBreakpoint(breakpoint, list) {
  return list.indexOf(breakpoint) > -1;
}