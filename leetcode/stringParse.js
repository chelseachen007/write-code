// 写一个算法 实现一个字符串的规则解析：例子：a(b)<2>c 输出：abbc，a(b(c)<3>de)<2>f 输出abcccdebcccdef；()代表重复内容，<>代表重复的次数
const string = 'a(b)<2>c'

function stringParse (string) {
  let newStr = ''
  let stack = []
  let num = 0
  let numStack = []
  for (let s of string) {
    // console.log(s.repeat('4'))
    let isNum = !isNaN(s);
    if (s == '(') {
      num = 0
    } else if (s == ')') {
    } else if (s == '<') {
      num = 0
    } else if (s == '>') {

    }

    else {
      if (isNum)
        newStr += s
    }
  }
}
stringParse(string)