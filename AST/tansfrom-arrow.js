const babel = require("@babel/core");
//@babel/types
/*  1. 判断这个节点是不是这个节点（ArrowFunctionExpression 下面的 path.node 是不是一个 ArrowFunctionExpression）
2. 生成对应的表达式 */
const t = require("@babel/types");
const code = `const fn = (a, b) => a + b`; // 转换后 const fn = function(a, b) { return a + b }
const arrowFnPlugin = {
  // 访问者模式
  visitor: {
    // 当访问到某个路径的时候进行匹配
    ArrowFunctionExpression(path) {
      // 拿到节点
      const node = path.node;
      console.log("ArrowFunctionExpression -> node", node);
      const params = node.params;
      const body = node.body;
      console.log(body[0]);

      //  t.functionExpression(id, params, body, generator, async)
      // id: Identifier (default: null) id 可传递 null
      // params: Array<LVal> (required) 函数参数，可以把之前的参数拿过来
      // body: BlockStatement (required) 函数体，接受一个 BlockStatement 我们需要生成一个
      // generator: boolean (default: false) 是否为 generator 函数，当然不是了
      // async: boolean (default: false) 是否为 async 函数，肯定不是了
      const functionExpression = t.functionExpression(
        null,
        params,
        t.blockStatement([body])
      );
      // 替换原来的函数
      // path.replaceWith(functionExpression);
    },
  },
};

const r = babel.transform(code, {
  plugins: [arrowFnPlugin],
});

console.log(r);
