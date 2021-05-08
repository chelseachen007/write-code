import React, { useState, useCallback } from "react";
export default function App() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("fruit");
	// 这行是重点
	const changeCount = useCallback(() => {
		setCount(count + 1);
	}, [count]);
	const changeName = () => {
		setName(name + 1);
	};

	return (
		<div>
			<div>Count is {count}</div>
			<div>Name is {name}</div>
			<br />
			<div>
				<button onClick={changeName}>Change Name</button>
				<Child changeCount={changeCount} />
			</div>
		</div>
	);
}

// 要结合memo使用
const Child = React.memo(({ changeCount }) => {
	console.log("Child render");
	return (
		<div>
			<button onClick={changeCount}>Increment Count</button>
		</div>
	);
});
