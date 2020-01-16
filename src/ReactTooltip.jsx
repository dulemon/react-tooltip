import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classname';
import jss from 'jss';
import preset from 'jss-preset-default';
import jssNested from 'jss-nested';
import jssExpand from 'jss-expand';
import jssGlobal from 'jss-global';
import convert from 'htmr';

jss.use(jssNested(), jssExpand(), jssGlobal());
// jss 是css的创作工具，它使得我们可以使用JavaScript以声明性、无冲突和可重用的方式描述样式。它可以在浏览器中，服务端或在node的构建时进行编译
const styles = {
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
    transition: 'opacity 0.3s ease',
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
}

const { classes } = jss.createStyleSheet(styles).attach()

const propTypes = {
  customClass: PropTypes.string
};

const defaultProps = {
  customClass: ''
}

class ReactTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scopedClass: '',
      tooltipContent: '',
    }
  }

  handleMouseout(selector) { //鼠标出函数
    return (e) => {
      // console.log(e.target.getAttribute(tooltip));
      if (e.target.getAttribute('tooltip')) { //如果页面中存在拥有tooltip属性的元素，将vmo-fed-react-tooltip设置为透明
        selector.style.opacity = '0';
        selector.style.left = '-999px';
        selector.style.top = '-999px';
      }
    }
  }

  handleMouseover(selector) { //鼠标移入函数
    return (e) => {
      if (e.target.getAttribute('tooltip')) {
        //selector.innerHTML = e.target.getAttribute('tooltip');
        // console.log(e.target.getAttribute('tooltip'));
        this.setState({
          tooltipContent: e.target.getAttribute('tooltip'),
        });
        const place = e.target.getAttribute('tooltip-place');
        const { customClass } = this.props;
        const scopedClass = classname({
          [e.target.getAttribute('tooltip-class')]: !!e.target.getAttribute('tooltip-class') //检查元素是否设置tooltip-class属性
        });
        selector.style.opacity = '0.8';
        switch (place) {
          case 'top':
            selector.className = `vmo-fed-react-tooltip ${customClass} ${classes.tooltip} ${classes.top} ${scopedClass}`;
            this.showTop(e, selector);
            break;
          case 'right':
            selector.className = `vmo-fed-react-tooltip ${customClass} ${classes.tooltip} ${classes.right} ${scopedClass}`;
            this.showRight(e, selector);
            break;
          case 'bottom':
            selector.className = `vmo-fed-react-tooltip ${customClass} ${classes.tooltip} ${classes.bottom} ${scopedClass}`;
            this.showBottom(e, selector);
            break;
          case 'left':
            selector.className = `vmo-fed-react-tooltip ${customClass} ${classes.tooltip} ${classes.left} ${scopedClass}`;
            this.showLeft(e, selector);
            break;
          default:
            break;
        }
      }

    }

  }

  //getBoundingClientReact用于获取某个元素集合相对于视窗的位置集合
  // .top 元素上边到视窗上边的距离 .right 元素右边到视窗左边的距离 .bottom 元素下边到视窗上边的距离 .left 元素左边到视窗左边的距离
  // .width 元素的宽度  .height 元素的高度
  // .x 用于left 
  showTop(e, selector) {
    selector.style.top = e.target.getBoundingClientRect().y - selector.clientHeight - 10 + 'px';
    selector.style.left = e.target.getBoundingClientRect().x + e.target.getBoundingClientRect().width / 2 - selector.clientWidth / 2 + 'px';
  }

  showRight(e, selector) {
    selector.style.top = e.target.getBoundingClientRect().y + e.target.getBoundingClientRect().height/2 - selector.clientHeight/2 + 'px';
    selector.style.left = e.target.getBoundingClientRect().x + e.target.getBoundingClientRect().width + 10 + 'px';
  }

  showLeft(e, selector) {
    selector.style.top = e.target.getBoundingClientRect().y + e.target.getBoundingClientRect().height/2 - selector.clientHeight/2 + 'px';
    selector.style.left = e.target.getBoundingClientRect().x - selector.clientWidth - 10 + 'px';
  }

  showBottom(e, selector) {
    selector.style.top = e.target.getBoundingClientRect().y + e.target.getBoundingClientRect().height + 10 + 'px';
    selector.style.left = e.target.getBoundingClientRect().x + e.target.getBoundingClientRect().width/2 - selector.clientWidth/2 + 'px';
  }

  componentDidMount() {
    const tooltipSelector = document.querySelector('.vmo-fed-react-tooltip');
    //为body元素设置mouseover和mouseout事件
    // mouseover mouseout 在鼠标进入或者离开作用元素或者其子元素时，都会触发
    // mouseenter mouseleave 在鼠标进入或离开作用元素时，会触发
    document.body.addEventListener('mouseover', this.handleMouseover(tooltipSelector));
    document.body.addEventListener('mouseout', this.handleMouseout(tooltipSelector));
  }

  render() {
    const { customClass } = this.props;
    const tooltipContent  = convert(this.state.tooltipContent);
    // console.log(tooltipContent);
    // console.log(classes);
    return (
    <div className={`vmo-fed-react-tooltip ${customClass} ${classes.tooltip}`}>{tooltipContent}</div>
    );
  }
}

ReactTooltip.propTypes = propTypes;
ReactTooltip.defaultProps = defaultProps;

export default ReactTooltip;
