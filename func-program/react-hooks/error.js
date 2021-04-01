// 1  使用装饰器等工具添加日志功能，日志功能可随时替换为抽样监控
// tools/untils.js
// 更改consoleLog方法即可替换为抽样监控
const consoleLog = console.info;
// 使用装饰器快速获取组件中方法调用事件、参数，并根据环境切换
function elog (showLog, opt = { showArgs: true }) {
  return function (target, name, _descriptor) {
    const _dt = _descriptor;
    const raw = _dt.value;
    const consoleRes = function (res) {
      consoleLog(name + ' finish synchronously at:', formatShortDate(Date.now()));
      consoleLog('------------------------------');
      return res;
    };
    _dt.value = function (...args) {
      if (showLog !== false) {
        try {
          consoleLog(name + ' called at:', formatShortDate(Date.now()));
          if (opt && opt.showArgs) {
            consoleLog('args(stringified):', JSON.stringify(args));
          }
        } catch (e) { consoleLog('elog error:', e); }
      }
      return consoleRes(raw.apply(this, args));
    };
    return _dt;
  };
}
// 针对函数式组件，使用包裹式装饰函数
function elogWrapper (wrapped) {
  return function () {
    consoleLog('args(stringified):' + JSON.stringify(arguments));
    // 省略部分逻辑
    const result = wrapped.apply(this, arguments);
    return result;
  };
}

// 组件使用方式
// pages/PuzzlePageController.js
class PuzzlePageController extends React.Component {
  // 省略部分逻辑
  @elog()
  slideUp () {
    console.log('slideUp')
    if (this.state.prev.sid !== 0) {
      this.props.changePuzzleSid(this.state.prev.sid)
    }
  }
}

// 2 包装组件，完成埋点等功能
// pages/HocSendInfo.js
import React, { Component } from 'react'
// 以下几个方法可以替换为响应的埋点、监控方法
const sendLog = (x1, x2) => console.log('sendLog', x1, x2)
const sendPV = x => console.log('sendPV', x)
const sendCptOn = x => console.log('sendCptOn', x)
const sendCptOff = x => console.log('sendCptOff', x)
const getPvInfo = () => Math.random()

export default (InnerComponent) => {
  class HocSendInfo extends React.Component {
    componentDidMount () {
      sendCptOn(JSON.stringify(this.props))
      sendLog('InnerComponent did mount, name is ',
        InnerComponent.name)
      sendPV(getPvInfo())
    }

    componentWillUnmount () {
      sendCptOn(JSON.stringify(this.props))
      sendLog('InnerComponent will Unmount, name is ',
        InnerComponent.name)
    }

    render () {
      return <InnerComponent {...this.props} />
    }

  }

  return HocSendInfo
}

// 调用包装的组件
// pages/puzzle/PuzzlePage.js
class PuzzlePageWithAd extends React.Component {
  // 省略部分逻辑
}
export default HocSendInfo(PuzzlePageWithAd)