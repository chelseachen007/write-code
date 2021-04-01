// 申明变量_state、生成标记
// 申明两个方法，分别对应useState所在函数组件和它被调用镶嵌的位置
const _state = [], _genIndex = 0;
const reRenderThisComponet = （state, contextCptFunc) => contextCptFunc(state)
const componetAnchorPosition = contextCptFunc => getCptParentPosition(contextCptFunc)

function useState (initialState, contextCptFunc) {
  const currentIndex = _genIndex;
  if (_state[currentIndex] === undefined) { _state[currentIndex] = initialState }
  const setState = newState => {
    _state[currentIndex] = newState;
    // 在外层重新render调用state的组件, 虚拟调用
    ReactDOM.render(reRenderThisComponet(_state, contextCptFunc),
      componetAnchorPosition);
    _genIndex = 0;
  }
  _genIndex += 1;
  return [_state[currentIndex], setState];
}