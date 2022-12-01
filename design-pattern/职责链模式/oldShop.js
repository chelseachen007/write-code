/* 
假设我们负责一个售卖手机的电商网站，经过分别交纳 500 元定金和 200 元定金的两轮预定后（订单已在此时生成），现在已经到了正式购买的阶段。
公司针对支付过定金的用户有一定的优惠政策。
在正式购买后，已经支付过 500 元定金的用户会收到 100 元的商城优惠券，
200 元定金的用户可以收到 50 元的优惠券，
而之前没有支付定金的用户只能进入普通购买模式，也就是没有优惠券，且在库存有限的情况下不一定保证能买到。 
*/
var order = function (orderType, pay, stock) {
	if (orderType === 1) {
		// 500 元定金购买模式
		if (pay === true) {
			// 已支付定金
			console.log("500 元定金预购, 得到 100 优惠券");
		} else {
			// 未支付定金，降级到普通购买模式
			if (stock > 0) {
				// 用于普通购买的手机还有库存
				console.log("普通购买, 无优惠券");
			} else {
				console.log("手机库存不足");
			}
		}
	} else if (orderType === 2) {
		// 200 元定金购买模式
		if (pay === true) {
			console.log("200 元定金预购, 得到 50 优惠券");
		} else {
			if (stock > 0) {
				console.log("普通购买, 无优惠券");
			} else {
				console.log("手机库存不足");
			}
		}
	} else if (orderType === 3) {
		if (stock > 0) {
			console.log("普通购买, 无优惠券");
		} else {
			console.log("手机库存不足");
		}
	}
};
order(1, true, 500); // 输出： 500 元定金预购, 得到 100 优惠券
