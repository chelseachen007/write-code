// 状态机实现
// 关于这个库的更多内容这里不再赘述，有兴趣的同学可以前往：https://github.com/jakesgordon/javascript-state-machine
var delegate = function (client, delegation) {
	return {
		buttonWasPressed: function () {
			// 将客户的操作委托给 delegation 对象
			return delegation.buttonWasPressed.apply(client, arguments);
		},
	};
};
var FSM = {
	off: {
		buttonWasPressed: function () {
			console.log("关灯");
			this.button.innerHTML = "下一次按我是开灯";
			this.currState = this.onState;
		},
	},
	on: {
		buttonWasPressed: function () {
			console.log("开灯");
			this.button.innerHTML = "下一次按我是关灯";
			this.currState = this.offState;
		},
	},
};
var Light = function () {
	this.offState = delegate(this, FSM.off);
	this.onState = delegate(this, FSM.on);
	this.currState = this.offState; // 设置初始状态为关闭状态
	this.button = null;
};
Light.prototype.init = function () {
	var button = document.createElement("button"),
		self = this;
	button.innerHTML = "已关灯";
	this.button = document.body.appendChild(button);
	this.button.onclick = function () {
		self.currState.buttonWasPressed();
	};
};
var light = new Light();
light.init();
