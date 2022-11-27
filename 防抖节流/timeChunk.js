// 分时函数
var timeChunk = function (ary, fn, count) {
	var obj, t;
	var len = ary.length;
	var start = function () {
		for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
			var obj = ary.shift();
			fn(obj);
		}
	};
	return function () {
		t = setInterval(function () {
			if (ary.length === 0) {
				// 如果全部节点都已经被创建好
				return clearInterval(t);
			}
			start();
		}, 200); // 分批执行的时间间隔，也可以用参数的形式传入
	};
};
