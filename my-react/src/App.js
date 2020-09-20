import React from "react";
import ReduxPage from "./pages/reduxPage";
// import RoutePage from "./pages/routePages";
import ReactReduxPage from "./pages/reactReduxPage/ReactReduxPage";
import store from "./store/";
// import {Provider} from "react-redux";
import { Provider } from "./my-react-redux/";
export default function App(props) {
  return (
    <div>
      {/* <RoutePage /> */}
      <Provider store={store}>
        <ReactReduxPage />
      </Provider>
      {/* <ReduxPage /> */}
      {/* <Game /> */}
    </div>
  );
}
