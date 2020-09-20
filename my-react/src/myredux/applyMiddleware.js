export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    // 这是原版的dispatch，这个dispatch只能接受plain object，不能处理异步、promise
    let dispatch = store.dispatch;

    const API = {
      getState: store.getState,
      dispatch: (actions, ...args) => dispatch(actions, ...args),
    };
    //将middlewares转化成 参数为 API 的函数数组
    const middlewaresChain = middlewares.map((middleware) => middleware(API));
    // 对 dispatch 进行增强
    dispatch = compose(...middlewaresChain)(store.dispatch);
    return {
      ...store,
      // 加强版的dispatch
      dispatch,
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
