export default function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState; // 选中的状态值，记录下方便获取
  let currentListeners = []; // 选中的监听器,方便订阅和取消订阅
  function getState() {
    return currentState;
  }
  // add = () => {
  //     store.dispatch({ type: "ADD" });
  //   };
  function dispatch(actions) {
    //将reducer执行一遍，获取变化后的值
    currentState = reducer(currentState, actions);
    // 发布订阅模式 都是通过一个数组进行遍历通知视图进行更新
    currentListeners.forEach((listener) => listener());
  }
  //订阅函数
  function subscribe(fn) {
    currentListeners.push(fn);
    // 返回一个取消订阅函数
    return () => (currentListeners = []);
  }

  dispatch({ type: "随机生成一段Type进行初始值设置" });
  return {
    getState,
    dispatch,
    subscribe,
  };
}
