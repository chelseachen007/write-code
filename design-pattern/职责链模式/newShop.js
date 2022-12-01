// 500 元订单
var order500 = function (orderType, pay, stock) {
	if (orderType === 1 && pay === true) {
		console.log("500 元定金预购, 得到 100 优惠券");
	} else {
		order200(orderType, pay, stock); // 将请求传递给 200 元订单
	}
};
// 200 元订单
var order200 = function (orderType, pay, stock) {
	if (orderType === 2 && pay === true) {
		console.log("200 元定金预购, 得到 50 优惠券");
	} else {
		orderNormal(orderType, pay, stock); // 将请求传递给普通订单
	}
};
// 普通购买订单
var orderNormal = function (orderType, pay, stock) {
	if (stock > 0) {
		console.log("普通购买, 无优惠券");
	} else {
		console.log("手机库存不足");
	}
};
// 测试结果：
order500(1, true, 500); // 输出：500 元定金预购, 得到 100 优惠券
order500(1, false, 500); // 输出：普通购买, 无优惠券
order500(2, true, 500); // 输出：200 元定金预购, 得到 500 优惠券
order500(3, false, 500); // 输出：普通购买, 无优惠券
order500(3, false, 0); // 输出：手机库存不足

// 这依然是违反开放封闭原则的，
// 如果有天我们要增加 300 元预订或者去掉 200 元预订，意味着就必须改动这些业务函数内部。就像一根环环相扣打了死结的链条，
// 如果要增加、拆除或者移动一个节点，就必须得先砸烂这根链条。
