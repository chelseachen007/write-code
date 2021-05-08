import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import LifeCycle from "./LifeCycle/LifeCycle";
import LifeCycle from "./LifeCycle/16.3";
import UseMemo from "./useMemo";
import UseCallback from "./useCallback";
ReactDOM.render(
	// <UseMemo></UseMemo>,
	<UseCallback />,
	/* 	<React.StrictMode>
		<LifeCycle />
	</React.StrictMode> */ document.getElementById(
		"root"
	)
);
