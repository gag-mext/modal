import '../style';
import React from 'react';
import Dialog from 'rc-dialog';
import classNames from 'classnames';
import assign from 'object-assign';
import Touchable from 'rc-touchable';

class Modal extends React.Component {

  isInModal(e) {
    if (!/\biPhone\b|\biPod\b/i.test(navigator.userAgent)) {
      return;
    }
    // fix touch to scroll background page on iOS
    const prefixCls = this.props.prefixCls;
    const pNode = (node => {
      while ( node.parentNode && node.parentNode !== document.body ) {
        if ( node.classList.contains(prefixCls)) {
          return node;
        }
        node = node.parentNode;
      }
    })(e.target);
    if (!pNode) {
      e.preventDefault();
    }
    return true;
  }

  renderFooterButton(button, prefixCls, i) {
    let buttonStyle = {};
    if (button.style) {
      buttonStyle = button.style;
      if (typeof buttonStyle === 'string') {
        const styleMap = {
          cancel: { fontWeight: 'bold' },
          default: {},
          destructive: { color: 'red' },
        };
        buttonStyle = styleMap[buttonStyle] || {};
      }
    }

    const onClickFn = function(e) {
      e.preventDefault();
      if (button.onPress) {
        button.onPress();
      }
    };

    return (
      <Touchable activeClassName={`${prefixCls}-button-active`} key={i}>
        <a className={`${prefixCls}-button`} style={buttonStyle} href="#" onClick={onClickFn}>
          {button.text || `Button`}
        </a>
      </Touchable>
    );
  }

  render() {
    const {
      prefixCls,
      className,
      transparent,
      animated,
      transitionName,
      maskTransitionName,
      style,
      footer = [],
      closable,
      operation,
      platform,
    } = this.props;
    const isAndroid = platform === 'android' || (platform === 'cross' && !!navigator.userAgent.match(/Android/i));
    const wrapCls = classNames({
      [className]: !!className,
      [`${prefixCls}-transparent`]: transparent,
      [`${prefixCls}-android`]: isAndroid,
    });

    let anim = transitionName || (animated ? (transparent ? 'am-fade' : 'am-slide-up') : null);
    let maskAnim = maskTransitionName || (animated ? (transparent ? 'am-fade' : 'am-slide-up') : null);

    const btnGroupClass = `${prefixCls}-button-group-${footer.length === 2 && !operation ? 'h' : 'v'}`;
    const footerDom = footer.length ? <div className={btnGroupClass}>
      {footer.map((button: any, i) => this.renderFooterButton(button, prefixCls, i))}
    </div> : null;

    // transparent 模式下, 内容默认居中
    const rootStyle = transparent ? assign({
      width: '5.4rem',
      height: 'auto',
    }, style) : assign({
      width: '100%',
      height: '100%',
    }, style);

    const restProps = assign({}, this.props);
    ['prefixCls', 'className', 'transparent', 'animated', 'transitionName', 'maskTransitionName',
      'style', 'footer', 'touchFeedback', 'wrapProps',
    ].forEach(prop => {
      if (restProps.hasOwnProperty(prop)) {
        delete restProps[prop];
      }
    });

    const wrapProps = { onTouchStart: e => this.isInModal(e) };

    return (
      <Dialog
        prefixCls={prefixCls}
        className={wrapCls}
        transitionName={anim}
        maskTransitionName={maskAnim}
        style={rootStyle}
        footer={footerDom}
        wrapProps={wrapProps}
        closable={closable}
        {...restProps}
      />
    );
  }
}
Modal.defaultProps = {
    prefixCls: 'am-modal',
    transparent: false,
    animated: true,
    style: {},
    onShow() {},
    footer: [],
    closable: false,
    operation: false,
    platform: 'cross',
};
Modal.propTypes = {
title: React.PropTypes.string,
visible:React.PropTypes.bool,
maskClosable:React.PropTypes.bool,
closable:React.PropTypes.bool,
footer: React.PropTypes.arrayOf(React.PropTypes.object),
onClose:React.PropTypes.func,
/** web only */
prefixCls: React.PropTypes.string,
transitionName: React.PropTypes.string,
maskTransitionName: React.PropTypes.string,
className: React.PropTypes.string,
wrapClassName: React.PropTypes.string,
touchFeedback:React.PropTypes.bool,
wrapProps:React.PropTypes.object,
operation:React.PropTypes.bool,
platform: React.PropTypes.string,
};
Modal.displayName = "Modal";
module.exports=Modal;
