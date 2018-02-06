/*!
 * vue-chartjs v3.1.1
 * (c) 2018 Jakub Juszczak <jakub@posteo.de>
 * http://vue-chartjs.org
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("chart.js"));
	else if(typeof define === 'function' && define.amd)
		define("VueChartJs", ["chart.js"], factory);
	else if(typeof exports === 'object')
		exports["VueChartJs"] = factory(require("chart.js"));
	else
		root["VueChartJs"] = factory(root["Chart"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/mixins/index.js
function dataHandler(newData, oldData) {
  if (oldData) {
    var chart = this.$data._chart;
    var newDatasetLabels = newData.datasets.map(function (dataset) {
      return dataset.label;
    });
    var oldDatasetLabels = oldData.datasets.map(function (dataset) {
      return dataset.label;
    });
    var oldLabels = JSON.stringify(oldDatasetLabels);
    var newLabels = JSON.stringify(newDatasetLabels);

    if (newLabels === oldLabels && oldData.datasets.length === newData.datasets.length) {
      newData.datasets.forEach(function (dataset, i) {
        var oldDatasetKeys = Object.keys(oldData.datasets[i]);
        var newDatasetKeys = Object.keys(dataset);
        var deletionKeys = oldDatasetKeys.filter(function (key) {
          return key !== '_meta' && newDatasetKeys.indexOf(key) === -1;
        });
        deletionKeys.forEach(function (deletionKey) {
          delete chart.data.datasets[i][deletionKey];
        });

        for (var attribute in dataset) {
          if (dataset.hasOwnProperty(attribute)) {
            chart.data.datasets[i][attribute] = dataset[attribute];
          }
        }
      });

      if (newData.hasOwnProperty('labels')) {
        chart.data.labels = newData.labels;
      }

      if (newData.hasOwnProperty('xLabels')) {
        chart.data.xLabels = newData.xLabels;
      }

      if (newData.hasOwnProperty('yLabels')) {
        chart.data.yLabels = newData.yLabels;
      }

      chart.update();
    } else {
      chart.destroy();
      this.renderChart(this.chartData, this.options);
    }
  } else {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }

    this.renderChart(this.chartData, this.options);
  }
}

var reactiveData = {
  data: function data() {
    return {
      chartData: null
    };
  },
  watch: {
    'chartData': dataHandler
  }
};
var reactiveProp = {
  props: {
    chartData: {
      required: true
    }
  },
  watch: {
    'chartData': dataHandler
  }
};
/* harmony default export */ var mixins = ({
  reactiveData: reactiveData,
  reactiveProp: reactiveProp
});
// EXTERNAL MODULE: external {"root":"Chart","commonjs":"chart.js","commonjs2":"chart.js","amd":"chart.js"}
var external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js__ = __webpack_require__(1);
var external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js___default = /*#__PURE__*/__webpack_require__.n(external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js__);

// CONCATENATED MODULE: ./src/BaseCharts.js


function generateChart(chartId, chartType) {
  return {
    render: function render(createElement) {
      return createElement('div', {
        style: this.styles,
        class: this.cssClasses
      }, [createElement('canvas', {
        attrs: {
          id: this.chartId,
          width: this.width,
          height: this.height
        },
        ref: 'canvas'
      })]);
    },
    props: {
      chartId: {
        default: chartId,
        type: String
      },
      width: {
        default: 400,
        type: Number
      },
      height: {
        default: 400,
        type: Number
      },
      cssClasses: {
        type: String,
        default: ''
      },
      styles: {
        type: Object
      },
      plugins: {
        type: Array,
        default: function _default() {
          return [];
        }
      }
    },
    data: function data() {
      return {
        _chart: null,
        _plugins: this.plugins
      };
    },
    methods: {
      addPlugin: function addPlugin(plugin) {
        this.$data._plugins.push(plugin);
      },
      renderChart: function renderChart(data, options) {
        this.$data._chart = new external___root___Chart___commonjs___chart_js___commonjs2___chart_js___amd___chart_js___default.a(this.$refs.canvas.getContext('2d'), {
          type: chartType,
          data: data,
          options: options,
          plugins: this.$data._plugins
        });
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }
    }
  };
}

var Bar = generateChart('bar-chart', 'bar');
var HorizontalBar = generateChart('horizontalbar-chart', 'horizontalBar');
var Doughnut = generateChart('doughnut-chart', 'doughnut');
var Line = generateChart('line-chart', 'line');
var Pie = generateChart('pie-chart', 'pie');
var PolarArea = generateChart('polar-chart', 'polarArea');
var Radar = generateChart('radar-chart', 'radar');
var Bubble = generateChart('bubble-chart', 'bubble');
var Scatter = generateChart('scatter-chart', 'scatter');
/* harmony default export */ var BaseCharts = ({
  Bar: Bar,
  HorizontalBar: HorizontalBar,
  Doughnut: Doughnut,
  Line: Line,
  Pie: Pie,
  PolarArea: PolarArea,
  Radar: Radar,
  Bubble: Bubble,
  Scatter: Scatter
});
// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueCharts", function() { return VueCharts; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Bar", function() { return Bar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "HorizontalBar", function() { return HorizontalBar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Doughnut", function() { return Doughnut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Line", function() { return Line; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Pie", function() { return Pie; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PolarArea", function() { return PolarArea; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Radar", function() { return Radar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Bubble", function() { return Bubble; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Scatter", function() { return Scatter; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "mixins", function() { return mixins; });


var VueCharts = {
  version: LIB_VERSION,
  Bar: Bar,
  HorizontalBar: HorizontalBar,
  Doughnut: Doughnut,
  Line: Line,
  Pie: Pie,
  PolarArea: PolarArea,
  Radar: Radar,
  Bubble: Bubble,
  Scatter: Scatter,
  mixins: mixins
};
/* harmony default export */ var src = __webpack_exports__["default"] = (VueCharts);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});