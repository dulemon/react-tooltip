'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classname2 = require('classname');

var _classname3 = _interopRequireDefault(_classname2);

var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

var _jssPresetDefault = require('jss-preset-default');

var _jssPresetDefault2 = _interopRequireDefault(_jssPresetDefault);

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _jssExpand = require('jss-expand');

var _jssExpand2 = _interopRequireDefault(_jssExpand);

var _jssGlobal = require('jss-global');

var _jssGlobal2 = _interopRequireDefault(_jssGlobal);

var _htmr = require('htmr');

var _htmr2 = _interopRequireDefault(_htmr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

_jss2.default.use((0, _jssNested2.default)(), (0, _jssExpand2.default)(), (0, _jssGlobal2.default)());
// jss 是css的创作工具，它使得我们可以使用JavaScript以声明性、无冲突和可重用的方式描述样式。它可以在浏览器中，服务端或在node的构建时进行编译
var styles = {
  '@global': {
    '[tooltip] *': {
      'pointer-events': 'none'
    }
  },
  tooltip: {
    position: 'fixed',
    background: '#000',
    padding: '10px 20px',
    color: '#fff',
    opacity: 0,
    'border-radius': '3px',
    display: 'inline-block',
    transition: 'opacity 0.3s ease'
  },
  top: {
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      'border-bottom': 'none',
      'border-top': '7px solid #000',
      'border-left': '7px solid transparent',
      'border-right': '7px solid transparent',
      bottom: '-7px',
      left: '50%',
      'margin-left': '-7px'
    }
  },
  right: {
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      'border-left': 'none',
      'border-right': '7px solid #000',
      'border-top': '7px solid transparent',
      'border-bottom': '7px solid transparent',
      left: '-7px',
      top: '50%',
      'margin-top': '-7px'
    }
  },
  bottom: {
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      'border-top': 'none',
      'border-bottom': '7px solid #000',
      'border-left': '7px solid transparent',
      'border-right': '7px solid transparent',
      top: '-7px',
      left: '50%',
      'margin-left': '-7px'
    }
  },
  left: {
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      'border-right': 'none',
      'border-left': '7px solid #000',
      'border-top': '7px solid transparent',
      'border-bottom': '7px solid transparent',
      right: '-7px',
      top: '50%',
      'margin-top': '-7px'
    }
  }
};

var _jss$createStyleSheet = _jss2.default.createStyleSheet(styles).attach(),
    classes = _jss$createStyleSheet.classes;

var propTypes = {
  customClass: _propTypes2.default.string
};

var defaultProps = {
  customClass: ''
};

var ReactTooltip = function (_Component) {
  _inherits(ReactTooltip, _Component);

  function ReactTooltip(props) {
    _classCallCheck(this, ReactTooltip);

    var _this = _possibleConstructorReturn(this, (ReactTooltip.__proto__ || Object.getPrototypeOf(ReactTooltip)).call(this, props));

    _this.state = {
      scopedClass: '',
      tooltipContent: ''
    };
    return _this;
  }

  _createClass(ReactTooltip, [{
    key: 'handleMouseout',
    value: function handleMouseout(selector) {
      //鼠标出函数
      return function (e) {
        // console.log(e.target.getAttribute(tooltip));
        if (e.target.getAttribute('tooltip')) {
          //如果页面中存在拥有tooltip属性的元素，将vmo-fed-react-tooltip设置为透明
          selector.style.opacity = '0';
          selector.style.left = '-999px';
          selector.style.top = '-999px';
        }
      };
    }
  }, {
    key: 'handleMouseover',
    value: function handleMouseover(selector) {
      var _this2 = this;

      //鼠标移入函数
      return function (e) {
        if (e.target.getAttribute('tooltip')) {
          //selector.innerHTML = e.target.getAttribute('tooltip');
          // console.log(e.target.getAttribute('tooltip'));
          _this2.setState({
            tooltipContent: e.target.getAttribute('tooltip')
          });
          var place = e.target.getAttribute('tooltip-place');
          var customClass = _this2.props.customClass;

          var scopedClass = (0, _classname3.default)(_defineProperty({}, e.target.getAttribute('tooltip-class'), !!e.target.getAttribute('tooltip-class')));
          selector.style.opacity = '0.8';
          switch (place) {
            case 'top':
              selector.className = 'vmo-fed-react-tooltip ' + customClass + ' ' + classes.tooltip + ' ' + classes.top + ' ' + scopedClass;
              _this2.showTop(e, selector);
              break;
            case 'right':
              selector.className = 'vmo-fed-react-tooltip ' + customClass + ' ' + classes.tooltip + ' ' + classes.right + ' ' + scopedClass;
              _this2.showRight(e, selector);
              break;
            case 'bottom':
              selector.className = 'vmo-fed-react-tooltip ' + customClass + ' ' + classes.tooltip + ' ' + classes.bottom + ' ' + scopedClass;
              _this2.showBottom(e, selector);
              break;
            case 'left':
              selector.className = 'vmo-fed-react-tooltip ' + customClass + ' ' + classes.tooltip + ' ' + classes.left + ' ' + scopedClass;
              _this2.showLeft(e, selector);
              break;
            default:
              break;
          }
        }
      };
    }

    //getBoundingClientReact用于获取某个元素集合相对于视窗的位置集合
    // .top 元素上边到视窗上边的距离 .right 元素右边到视窗左边的距离 .bottom 元素下边到视窗上边的距离 .left 元素左边到视窗左边的距离
    // .width 元素的宽度  .height 元素的高度
    // .x 用于left 

  }, {
    key: 'showTop',
    value: function showTop(e, selector) {
      selector.style.top = e.target.getBoundingClientRect().y - selector.clientHeight - 10 + 'px';
      selector.style.left = e.target.getBoundingClientRect().x + e.target.getBoundingClientRect().width / 2 - selector.clientWidth / 2 + 'px';
    }
  }, {
    key: 'showRight',
    value: function showRight(e, selector) {
      selector.style.top = e.target.getBoundingClientRect().y + e.target.getBoundingClientRect().height / 2 - selector.clientHeight / 2 + 'px';
      selector.style.left = e.target.getBoundingClientRect().x + e.target.getBoundingClientRect().width + 10 + 'px';
    }
  }, {
    key: 'showLeft',
    value: function showLeft(e, selector) {
      selector.style.top = e.target.getBoundingClientRect().y + e.target.getBoundingClientRect().height / 2 - selector.clientHeight / 2 + 'px';
      selector.style.left = e.target.getBoundingClientRect().x - selector.clientWidth - 10 + 'px';
    }
  }, {
    key: 'showBottom',
    value: function showBottom(e, selector) {
      selector.style.top = e.target.getBoundingClientRect().y + e.target.getBoundingClientRect().height + 10 + 'px';
      selector.style.left = e.target.getBoundingClientRect().x + e.target.getBoundingClientRect().width / 2 - selector.clientWidth / 2 + 'px';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var tooltipSelector = document.querySelector('.vmo-fed-react-tooltip');
      //为body元素设置mouseover和mouseout事件
      // mouseover mouseout 在鼠标进入或者离开作用元素或者其子元素时，都会触发
      // mouseenter mouseleave 在鼠标进入或离开作用元素时，会触发
      document.body.addEventListener('mouseover', this.handleMouseover(tooltipSelector));
      document.body.addEventListener('mouseout', this.handleMouseout(tooltipSelector));
    }
  }, {
    key: 'render',
    value: function render() {
      var customClass = this.props.customClass;

      var tooltipContent = (0, _htmr2.default)(this.state.tooltipContent);
      // console.log(tooltipContent);
      // console.log(classes);
      return _react2.default.createElement(
        'div',
        { className: 'vmo-fed-react-tooltip ' + customClass + ' ' + classes.tooltip },
        tooltipContent
      );
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return ReactTooltip;
}(_react.Component);

ReactTooltip.propTypes = propTypes;
ReactTooltip.defaultProps = defaultProps;

var _default = ReactTooltip;
exports.default = _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(styles, 'styles', 'src/ReactTooltip.jsx');
  reactHotLoader.register(classes, 'classes', 'src/ReactTooltip.jsx');
  reactHotLoader.register(propTypes, 'propTypes', 'src/ReactTooltip.jsx');
  reactHotLoader.register(defaultProps, 'defaultProps', 'src/ReactTooltip.jsx');
  reactHotLoader.register(ReactTooltip, 'ReactTooltip', 'src/ReactTooltip.jsx');
  reactHotLoader.register(_default, 'default', 'src/ReactTooltip.jsx');
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
