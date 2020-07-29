//https://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247485547&idx=1&sn=4e7e2edb63b7854e2a676c846a8bc838&chksm=f9910ebacee687ac1dea6ff8f43688e77053d9928687ddc0ef9bcdbabc42e05dfc400a0b5304&mpshare=1&scene=1&srcid=0622O1GnoNdWaelURIrCIYqz&sharer_sharetime=1592787049081&sharer_shareid=c65ddbf569523f44545b22a63301140a&key=43b0bcd307a6b686df11a3cb269156210818bb25a2986a15d1329a05f80ec88f7e40524928bbca01a2686460b9a38072b217fc3d22d2c9daecd2add6ab870be35d96d08f1a2efed4d2c480f2d783e57d&ascene=1&uin=MTIwOTc2NTAyMQ%3D%3D&devicetype=Windows+10+x64&version=62090523&lang=zh_CN&exportkey=AUXn8qvsHCfgcKyMCXviZwA%3D&pass_ticket=z8qp7DE1213uJDe3cPSk%2Bg2eEHqEcVeFcX7YSJR14P6d5UwQ3y55zcpTRsV55fCM
const esprima = require("esprima");
const estraverse = require("cnp");
const code = `function getUser() {}`;
// 生成 AST
const ast = esprima.parseScript(code);
// 转换 AST，只会遍历 type 属性
// traverse 方法中有进入和离开两个钩子函数
estraverse.traverse(ast, {
  enter(node) {
    console.log("enter -> node.type", node.type);
  },
  leave(node) {
    console.log("leave -> node.type", node.type);
  },
});
//enter -> node.type Program
// enter -> node.type FunctionDeclaration
// enter -> node.type Identifier
// leave -> node.type Identifier
// enter -> node.type BlockStatement
// leave -> node.type BlockStatement
// leave -> node.type FunctionDeclaration
// leave -> node.type Program

// 转换树
estraverse.traverse(ast, {
  // 进入离开修改都是可以的
  enter(node) {
    console.log("enter -> node.type", node.type);
    if (node.type === "Identifier") {
      node.name = "hello";
    }
  },
  leave(node) {
    console.log("leave -> node.type", node.type);
  },
});
// 生成新的代码
const result = escodegen.generate(ast);
console.log(result);
// function hello() {}
