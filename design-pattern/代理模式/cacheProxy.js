// 缓存代理
var proxyMult = (function () {
	var cache = {};
	return function () {
		var args = Array.prototype.join.call(arguments, ",");
		if (args in cache) {
			return cache[args];
		}
		return (cache[args] = mult.apply(this, arguments));
	};
})();
