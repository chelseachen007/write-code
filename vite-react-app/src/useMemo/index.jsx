import React from "react";
import ChildA from "./childA";
import ChildB from "./childB";
class App extends React.Component {
	state = {
		textA: "我是A的文本",
		stateB: {
			text: "我是B的文本",
			count: 10,
		},
	};

	changeA = () => {
		this.setState({
			textA: "A的文本被修改了",
		});
	};

	changeB = () => {
		this.setState({
			stateB: {
				...this.state.stateB,

				count: 100,
			},
		});
	};

	render() {
		return (
			<div className="App">
				<div className="container">
					<button onClick={this.changeA}>点击修改A处的文本</button>
					<button onClick={this.changeB}>点击修改B处的文本</button>
					<ul>
						<li>
							<ChildA text={this.state.textA} />
						</li>

						<li>
							<ChildB {...this.state.stateB} />
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default App;
