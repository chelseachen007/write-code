// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import promise from "redux-promise";
import { createStore, applyMiddleware, combineReducers } from "../myredux";
import isPromise from "is-promise";

function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(
  // countReducer,
  // ! 课后补充： combineReducers用法
  combineReducers({ count: countReducer }),
  applyMiddleware(thunk, logger, promise)
);

export default store;

function logger({ getState }) {
  return (next) => (action) => {
    console.log(next);
    console.log("*******************************");

    console.log(action.type + "执行了！");

    let prevState = getState();
    console.log("prev state", prevState);

    const returnValue = next(action);
    let nextState = getState();
    console.log("next state", nextState);

    console.log("*******************************");
    return returnValue;
  };
}

// !next就是聚合函数

function thunk({ dispatch, getState }) {
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

function promise({ dispatch }) {
  return (next) => (action) => {
    console.log(next);
    /*     dispatch(actions) {
      currentState = reducer(currentState, actions); 
      currentListeners.forEach(listener => listener());
    } */
    console.log(action);
    //  {type: "MINUS", payload: 100}

    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
