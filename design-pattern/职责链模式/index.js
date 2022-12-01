var order500 = function (orderType, pay, stock) {
	if (orderType === 1 && pay === true) {
		console.log("500 元定金预购，得到 100 优惠券");
	} else {
		return "nextSuccessor"; // 我不知道下一个节点是谁，反正把请求往后面传递
	}
};
var order200 = function (orderType, pay, stock) {
	if (orderType === 2 && pay === true) {
		console.log("200 元定金预购，得到 50 优惠券");
	} else {
		return "nextSuccessor"; // 我不知道下一个节点是谁，反正把请求往后面传递
	}
};
var orderNormal = function (orderType, pay, stock) {
	if (stock > 0) {
		console.log("普通购买，无优惠券");
	} else {
		console.log("手机库存不足");
	}
};

// Chain.prototype.setNextSuccessor 指定在链中的下一个节点
// Chain.prototype.passRequest 传递请求给某个节点
class Chain {
	constructor(fn) {
		this.fn = fn;
		this.successor = null;
	}
	setNextSuccessor(successor) {
		return (this.successor = successor);
	}
	passRequest() {
		var ret = this.fn.apply(this, arguments);
		if (ret === "nextSuccessor") {
			return (
				this.successor &&
				this.successor.passRequest.apply(this.successor, arguments)
			);
		}
		return ret;
	}
}
// 现在我们把 3 个订单函数分别包装成职责链的节点：
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);
// 然后指定节点在职责链中的顺序：
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

// 最后把请求传递给第一个节点：
chainOrder500.passRequest(1, true, 500); // 输出：500 元定金预购，得到 100 优惠券
chainOrder500.passRequest(2, true, 500); // 输出：200 元定金预购，得到 50 优惠券
chainOrder500.passRequest(3, true, 500); // 输出：普通购买，无优惠券
chainOrder500.passRequest(1, false, 0); // 输出：手机库存不足
