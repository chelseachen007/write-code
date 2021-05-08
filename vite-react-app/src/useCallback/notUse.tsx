import React, { useState } from "react";
function App() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("fruit");
	const changeCount = () => {
		setCount(count + 1);
	};
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

function Child({ changeCount }) {
	console.log("Child render");
	return (
		<div>
			<button onClick={changeCount}>Increment Count</button>
		</div>
	);
}

export default App;
