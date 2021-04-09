import React from "react";

export default class ChildA extends React.Component {
	render() {
		console.log("ChildA 的render方法执行了");

		return (
			<div className="childA">
				子组件A的内容：
				{this.props.text}
			</div>
		);
	}
}
