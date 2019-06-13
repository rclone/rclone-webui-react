'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * --------------------------------------------------------------------------
 * CoreUI Plugins - Custom Tooltips for Chart.js (v1.2.0): custom-tooltips.js
 * Licensed under MIT (https://coreui.io/license)
 * --------------------------------------------------------------------------
 */
function CustomTooltips(tooltipModel) {
  var _this = this;

  // Add unique id if not exist
  var _setCanvasId = function _setCanvasId() {
    var _idMaker = function _idMaker() {
      var _hex = 16;
      var _multiplier = 0x10000;
      return ((1 + Math.random()) * _multiplier | 0).toString(_hex);
    };

    var _canvasId = "_canvas-" + (_idMaker() + _idMaker());

    _this._chart.canvas.id = _canvasId;
    return _canvasId;
  };

  var ClassName = {
    ABOVE: 'above',
    BELOW: 'below',
    CHARTJS_TOOLTIP: 'chartjs-tooltip',
    NO_TRANSFORM: 'no-transform',
    TOOLTIP_BODY: 'tooltip-body',
    TOOLTIP_BODY_ITEM: 'tooltip-body-item',
    TOOLTIP_BODY_ITEM_COLOR: 'tooltip-body-item-color',
    TOOLTIP_BODY_ITEM_LABEL: 'tooltip-body-item-label',
    TOOLTIP_BODY_ITEM_VALUE: 'tooltip-body-item-value',
    TOOLTIP_HEADER: 'tooltip-header',
    TOOLTIP_HEADER_ITEM: 'tooltip-header-item'
  };
  var Selector = {
    DIV: 'div',
    SPAN: 'span',
    TOOLTIP: (this._chart.canvas.id || _setCanvasId()) + "-tooltip"
  };
  var tooltip = document.getElementById(Selector.TOOLTIP);

  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = Selector.TOOLTIP;
    tooltip.className = ClassName.CHARTJS_TOOLTIP;

    this._chart.canvas.parentNode.appendChild(tooltip);
  } // Hide if no tooltip


  if (tooltipModel.opacity === 0) {
    tooltip.style.opacity = 0;
    return;
  } // Set caret Position


  tooltip.classList.remove(ClassName.ABOVE, ClassName.BELOW, ClassName.NO_TRANSFORM);

  if (tooltipModel.yAlign) {
    tooltip.classList.add(tooltipModel.yAlign);
  } else {
    tooltip.classList.add(ClassName.NO_TRANSFORM);
  } // Set Text


  if (tooltipModel.body) {
    var titleLines = tooltipModel.title || [];
    var tooltipHeader = document.createElement(Selector.DIV);
    tooltipHeader.className = ClassName.TOOLTIP_HEADER;
    titleLines.forEach(function (title) {
      var tooltipHeaderTitle = document.createElement(Selector.DIV);
      tooltipHeaderTitle.className = ClassName.TOOLTIP_HEADER_ITEM;
      tooltipHeaderTitle.innerHTML = title;
      tooltipHeader.appendChild(tooltipHeaderTitle);
    });
    var tooltipBody = document.createElement(Selector.DIV);
    tooltipBody.className = ClassName.TOOLTIP_BODY;
    var tooltipBodyItems = tooltipModel.body.map(function (item) {
      return item.lines;
    });
    tooltipBodyItems.forEach(function (item, i) {
      var tooltipBodyItem = document.createElement(Selector.DIV);
      tooltipBodyItem.className = ClassName.TOOLTIP_BODY_ITEM;
      var colors = tooltipModel.labelColors[i];
      var tooltipBodyItemColor = document.createElement(Selector.SPAN);
      tooltipBodyItemColor.className = ClassName.TOOLTIP_BODY_ITEM_COLOR;
      tooltipBodyItemColor.style.backgroundColor = colors.backgroundColor;
      tooltipBodyItem.appendChild(tooltipBodyItemColor);

      if (item[0].split(':').length > 1) {
        var tooltipBodyItemLabel = document.createElement(Selector.SPAN);
        tooltipBodyItemLabel.className = ClassName.TOOLTIP_BODY_ITEM_LABEL;
        tooltipBodyItemLabel.innerHTML = item[0].split(': ')[0];
        tooltipBodyItem.appendChild(tooltipBodyItemLabel);
        var tooltipBodyItemValue = document.createElement(Selector.SPAN);
        tooltipBodyItemValue.className = ClassName.TOOLTIP_BODY_ITEM_VALUE;
        tooltipBodyItemValue.innerHTML = item[0].split(': ').pop();
        tooltipBodyItem.appendChild(tooltipBodyItemValue);
      } else {
        var _tooltipBodyItemValue = document.createElement(Selector.SPAN);

        _tooltipBodyItemValue.className = ClassName.TOOLTIP_BODY_ITEM_VALUE;
        _tooltipBodyItemValue.innerHTML = item[0];
        tooltipBodyItem.appendChild(_tooltipBodyItemValue);
      }

      tooltipBody.appendChild(tooltipBodyItem);
    });
    tooltip.innerHTML = '';
    tooltip.appendChild(tooltipHeader);
    tooltip.appendChild(tooltipBody);
  }

  var positionY = this._chart.canvas.offsetTop;
  var positionX = this._chart.canvas.offsetLeft; // Display, position, and set styles for font

  tooltip.style.opacity = 1;
  tooltip.style.left = positionX + tooltipModel.caretX + "px";
  tooltip.style.top = positionY + tooltipModel.caretY + "px";
}

var customTooltips = CustomTooltips; // TODO: camel-case

exports.CustomTooltips = CustomTooltips;
exports.customTooltips = customTooltips;
//# sourceMappingURL=custom-tooltips.js.map
