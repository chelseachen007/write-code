import React, { useMemo } from "react";

export default function ChildB({ text, count }) {
	console.log("ChildB 的render 逻辑执行了");

	// text 文本的渲染逻辑

	const renderText = (text) => {
		console.log("renderText 执行了");
		return (
			<p>
				子组件B的文本内容：
				{text}
			</p>
		);
	};

	// count 数字的渲染逻辑

	const renderCount = (count) => {
		console.log("renderCount 执行了");
		return (
			<p>
				子组件B的数字内容：
				{count}
			</p>
		);
	};

	// 使用 useMemo 加持两段渲染逻辑
	const textContent = useMemo(() => renderText(text), [text]);
	const countContent = useMemo(() => renderCount(count), [count]);

	return (
		<div className="childB">
			{textContent}
			{countContent}
			{/* {renderCount(text)}
			{renderText(count)} */}
		</div>
	);
}
