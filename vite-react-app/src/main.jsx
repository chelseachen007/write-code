import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import LifeCycle from "./LifeCycle/LifeCycle";
import LifeCycle from "./LifeCycle/16.3";
import UseMemo from "./useMemo";
ReactDOM.render(
	<UseMemo></UseMemo>,
	/* 	<React.StrictMode>
		<LifeCycle />
	</React.StrictMode> */ document.getElementById(
		"root"
	)
);
