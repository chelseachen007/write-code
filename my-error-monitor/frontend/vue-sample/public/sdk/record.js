//https://github.com/rrweb-io/rrweb/blob/master/guide.zh_CN.md
const rrweb = require('rrweb')

class errRecord {
    constructor() {
        // 使用二维数组来存放多个 event 数组
        this.eventsMatrix = [[]];
        // 每个快照时间
        this.checkoutTime = 10 /* 5 * 60 */
    }
    getInstance () {
        if (!this.instance) {
            this.instance = new errRecord()
        }
        return this.instance
    }
    init () {
        let that = this

        rrweb.record({
            emit: this.emit.bind(that),//获取当前录制的数据
            checkoutEveryNms: this.checkoutTime * 1000, //  每 N 毫秒重新制作一次全量快照
            // checkoutEveryNth,	//- 每 N 次事件重新制作一次全量快照
            blockClass: 'rr-block', //字符串或正则表达式，可用于自定义屏蔽元素的类名，详见“隐私”章节
            ignoreClass: 'rr-ignore',//字符串或正则表达式，可用于自定义忽略元素的类名，详见“隐私”章节
            maskAllInputs: false, //将所有输入内容记录为 *
            maskInputOptions: {},//选择将特定类型的输入框内容记录为 *
            inlineStylesheet: true,//是否将样式表内联
            hooks: {},	//各类事件的回调
            // packFn :- 数据压缩函数，详见优化存储策略
            // sampling: - 数据抽样策略，详见优化存储策略
            recordCanvas: false, //是否记录 canvas 内容
            collectFonts: false	//是否记录页面中的字体文件
        });
    }
    emit (event, isCheckout) {
        console.log(this.eventsMatrix)
        // isCheckout 是一个标识，告诉你重新制作了快照
        if (isCheckout) {
            this.eventsMatrix.push([]);
        }
        const lastEvents = this.eventsMatrix[this.eventsMatrix.length - 1];
        lastEvents.push(event);
    }
    getLastEvent (n) {
        const events = this.eventsMatrix.slice(-n)
        return events
    }
}

window.errRecord = new errRecord().getInstance()
window.errRecord.init()