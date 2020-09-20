//combineReducers 辅助函数的作用是，
// 把一个由多个不同 reducer 函数作为 value 的 object，
// 合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。
// 实例：
// rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
// rootReducer 将返回如下的 state 对象
// {
//   potato: {
// ... potatoes, 和一些其他由 potatoReducer 管理的 state 对象 ...
//   },
//   tomato: {
// ... tomatoes, 和一些其他由 tomatoReducer 管理的 state 对象，比如说 sauce 属性 ...
//   }
// }
// 每个传入 combineReducers 的 reducer 都需满足以下规则：
// 所有未匹配到的 action，必须把它接收到的第一个参数也就是那个 state 原封不动返回。
// 永远不能返回 undefined。当过早 return 时非常容易犯这个错误，为了避免错误扩散，遇到这种情况时 combineReducers 会抛异常。
// 如果传入的 state 就是 undefined，一定要返回对应 reducer 的初始 state。根据上一条规则，初始 state 禁止使用 undefined。
// 使用 ES6 的默认参数值语法来设置初始 state 很容易，但你也可以手动检查第一个参数是否为 undefined。
export default function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  //放这里先循环一遍，过滤非函数
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  return function combination(state = {}, action) {
    var hasChanged = false; // 做缓存的标记
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      nextState[_key] = nextStateForKey;
      //判断值有没变化
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    //判断有没新增state
    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
  // {
  //     reducer1: ...
  //     reducer2: ...
  //     }
}

// 毛里塔尼亚
// 简写一遍
// export default function combineReducers(reducers) {
//   return function combination(state = {}, action) {
//     var hasChanged = false; // 做缓存的标记
//     var nextState = {};
//     // 循环reducer，如果是函数就进行执行
//     // 将执行完成的值，赋值给对象保存
//     for (let key in reducers) {
//       let reducer = reducers[key];
//       if (typeof reducer !== "function") {
//         break;
//       }
//       var previousStateForKey = state[key];
//       var nextStateForKey = reducer(previousStateForKey, action);
//       nextState[key] = nextStateForKey;
//      //判断值有没变化
//       hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
//     }
//      //判断有没新增state
//     hasChanged =
//       hasChanged || Object.keys(nextState).length !== Object.keys(state).length;
//     return hasChanged ? nextState : state;
//   };
// }
