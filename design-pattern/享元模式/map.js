// 场景；在搜索我家附近地图的时候，页面里出现了 2 个小气泡。当我再搜索附近的兰州拉面馆时，页面中出现了 6 个小气泡。
// 按照对象池的思想，在第二次搜索开始之前，并不会把第一次创建的2个小气泡删除掉，而是把它们放进对象池。
//  这样在第二次的搜索结果页面里，我们只需要再创建 4 个小气泡而不是 6 个，

/* 
先定义一个获取小气泡节点的工厂，作为对象池的数组成为私有属性被包含在工厂闭包里，
这个工厂有两个暴露对外的方法，create 表示获取一个 div 节点，recover 表示回收一个 div 节点
 */

var toolTipFactory = (function () {
	var toolTipPool = []; // toolTip 对象池
	return {
		create: function () {
			if (toolTipPool.length === 0) {
				// 如果对象池为空
				var div = document.createElement("div"); // 创建一个 dom
				document.body.appendChild(div);
				return div;
			} else {
				// 如果对象池里不为空
				return toolTipPool.shift(); // 则从对象池中取出一个 dom
			}
		},
		recover: function (tooltipDom) {
			return toolTipPool.push(tooltipDom); // 对象池回收 dom
		},
	};
})();

var ary = [];
for (var i = 0, str; (str = ["A", "B"][i++]); ) {
	var toolTip = toolTipFactory.create();
	toolTip.innerHTML = str;
	ary.push(toolTip);
}

// 接下来假设地图需要开始重新绘制，在此之前要把这两个节点回收进对象池：
for (var i = 0, toolTip; (toolTip = ary[i++]); ) {
	toolTipFactory.recover(toolTip);
}
// 再创建 6 个小气泡：
for (var i = 0, str; (str = ["A", "B", "C", "D", "E", "F"][i++]); ) {
	var toolTip = toolTipFactory.create();
	toolTip.innerHTML = str;
}
