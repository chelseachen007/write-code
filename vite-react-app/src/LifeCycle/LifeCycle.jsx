import React from "react";

import ReactDOM from "react-dom";

// 定义子组件

class LifeCycle extends React.Component {
	constructor(props) {
		super(props);
		console.log("进入constructor");
		// state 可以在 constructor 里初始化
		this.state = { text: "子组件的文本" };
	}

	// 初始化渲染时调用

	componentWillMount() {
		console.log("componentWillMount方法执行");
	}

	// 初始化渲染时调用

	componentDidMount() {
		console.log("componentDidMount方法执行");
	}

	// 父组件修改组件的props时会调用

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps方法执行");
	}

	// 组件更新时调用

	shouldComponentUpdate(nextProps, nextState) {
		console.log("shouldComponentUpdate方法执行");

		return true;
	}

	// 组件更新时调用

	componentWillUpdate(nextProps, nextState) {
		console.log("componentWillUpdate方法执行");
	}

	// 组件更新后调用

	componentDidUpdate(preProps, preState) {
		console.log("componentDidUpdate方法执行");
	}

	// 组件卸载时调用

	componentWillUnmount() {
		console.log("子组件的componentWillUnmount方法执行");
	}

	// 点击按钮，修改子组件文本内容的方法

	changeText = () => {
		this.setState({
			text: "修改后的子组件文本",
		});
	};

	render() {
		console.log("render方法执行");

		return (
			<div className="container">
				<button onClick={this.changeText} className="changeText">
					修改子组件文本内容
				</button>

				<p className="textContent">{this.state.text}</p>

				<p className="fatherContent">{this.props.text}</p>
			</div>
		);
	}
}

// 定义 LifeCycle 组件的父组件

class LifeCycleContainer extends React.Component {
	// state 也可以像这样用属性声明的形式初始化

	state = {
		text: "父组件的文本",
		// 新增的只与父组件有关的 state
		ownText: "仅仅和父组件有关的文本",
		hideChild: false,
	};

	changeText = () => {
		this.setState({
			text: "修改后的父组件文本",
		});
	};

	// 修改 ownText 的方法

	changeOwnText = () => {
		this.setState({
			ownText: "修改后的父组件自有文本",
		});
	};

	hideChild = () => {
		this.setState({
			hideChild: true,
		});
	};

	render() {
		return (
			<div className="fatherContainer">
				{/* 新的button按钮 */}

				<button onClick={this.changeOwnText} className="changeText">
					修改父组件自有文本内容
				</button>

				<button onClick={this.changeText} className="changeText">
					修改父组件文本内容
				</button>

				<button onClick={this.hideChild} className="hideChild">
					隐藏子组件
				</button>

				<p> {this.state.ownText} </p>

				{this.state.hideChild ? null : <LifeCycle text={this.state.text} />}
			</div>
		);
	}
}

export default LifeCycleContainer;
