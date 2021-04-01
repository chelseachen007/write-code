// 入参  使用标注
const teamCount = 13
const newTeamNumbers = [2, 4, 5, 8, 9]
const C = teamCount
const N = newTeamNumbers

// 函数1 常规循环做法
function pickMember (C, N) {
  const members = []
  for (i = 0; i < C; i += 1) {
    const _member = {
      org: 'techTeam',
      number: i
    }
    if (N.indexOf(_member.number) >= 0) {
      members[i] = _member
    }
  }
  return members
}

// 函数2 基于过程的简单封装
import _ from 'lodash'
function pickMember (C, N) {
  const setRangeList = count => _.range(count)
  const fillMember = (x, i) => { org: 'techTeam', number: i }
  const ifPick = (_N, number) => _N.indexOf(number) >= 0
  const filterPicked = number => ifPick(N, number)  // 此处依赖N, 可再拆分
  return _.filter(_.map(setRangeList(C), fillMember), filterPicked);
  // 经过基本的封装，入参C在最中间的函数处传入
}

// 函数3 基于过程的Compose/Pipeline处理
import _ from 'lodash'
function pickMember (C, N) {
  // 改造方法，将N也作为入参传入
  const setRangeList = [count, _N]  => [_.range(count), _N]      // 第一个函数
  const fillMember = (x, i) => { org: 'techTeam', number: i }
  const mapAndFill = _.curry(_.map)(_, fillMember)
  const mapFillWithTail = [range, _N] => [mapAndFill(range), _N]  // 第二个函数
  const ifPick = [number, _N] => _N.indexOf(number) >= 0
  const filterByPicker = _.curry(_.filter)(_, ifPick)           // 第三个函数

  if (Math.random() > 0.5) {
    // 3.1 compose  _.flowRight 在lodash4 之前为 _.compose
    // 从右到左依次调用函数
    return _.flowRight([filterByPicker, mapFillWithTail, setRangeList])([C, N])
  } else {
    // 3.2 pipeline  _.flow 在lodash4 之前为 _.pipeline
    // 从左到右依次调用函数
    return _.flow([setRangeList, mapFillWithTail, filterByPicker])([C, N])
  }
}

// 函数4 适度转换后的链式操作
function pickMember (C, N) {
  return _.range(C).map(x => ({ org: 'techTeam', number: x }))
    .filter(x => N.indexOf(x.number) >= 0)
}