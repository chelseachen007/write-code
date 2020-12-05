//bundle.js
const fs = require("fs");
const path = require("path")
// @babel/parser:https://babeljs.io/docs/en/babel-parser
//帮助我们分析内部的语法，包括es6，返回⼀个ast抽象语法树
const parser = require("@babel/parser");
//根据body⾥⾯的分析结果，遍历出所有的引⼊模块
const traverse = require("@babel/traverse").default;
// 进行转化
const babel = require('@babel/core');

const fenximokuai = filename => {
    const content = fs.readFileSync(filename, "utf-8");
    const Ast = parser.parse(content, {
        sourceType: "module"
    });
    // console.log(Ast.program.body);

    const dependencies = [];
    //分析ast抽象语法树，根据需要返回对应数据，
    //根据结果返回对应的模块，定义⼀个数组，接受⼀下node.source.value的值
    // 提取出 ImportDeclaration 类型的数据
    // 对Ast 以函数方式进行操作
    traverse(Ast, {
        ImportDeclaration ({ node }) {
            // console.log(node);
            dependencies.push(node.source.value);
        }
    });
    // console.log(dependencies);
    // 将代码转化成 比如es5支持的代码，选择相应的预设
    const { code } = babel.transformFromAst(Ast, null, {
        presets: ["@babel/preset-env"]
    });
    // console.log(code, 'code')
    /* 
    "use strict";

    var _message = _interopRequireDefault(require("./message.js"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
 */
    //但是 require 等node自带的函数是缺失的
    return {
        filename,
        dependencies,
        code
    }
};

const makeDependenciesGraph = (entry) => {
    const entryModule = fenximokuai(entry);
    const graphArray = [entryModule];
    for (let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i];
        const { dependencies } = item;
        if (dependencies) {
            for (let j in dependencies) {
                graphArray.push(
                    fenximokuai(dependencies[j])
                );
            }
        }
    }
    // console.log(graphArray)
    // [{
    //         filename: './index.js',
    //         dependencies: ['./message.js'],
    //         code
    //     }]
    // 将数组转化成 对象 ，以路径为Key
    const graph = {};
    graphArray.forEach(item => {
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    });
    // console.log(graph)
    // {
    //     './index.js': {
    //         dependencies: ['./word.js'],
    //             code
    //     }
    // }
    return graph;
}
// const graph = JSON.stringify(makeDependenciesGraph('./index.js'))
// console.log(graph)
// const moduleInfo = fenximokuai("./index.js");
// console.log(moduleInfo)

const generateCode = (entry) => {
    // 转成JSON，不然直接转换会变成 `[Object,object]`
    const graph = JSON.stringify(makeDependenciesGraph(entry));
    return `
    (function (graph) {
        function require (module) {
            // 将相对路径转化成 从根目录开始的路径 , 上面有保存
            function localRequire (relativePath) {
                return require(graph[module].dependencies[relativePath]);
            }

            var exports = {};
            (function (require, exports, code) {
                eval(code)
            })(localRequire, exports, graph[module].code);
            return exports;
        };
        require('${entry}')
    })(${graph});
    `;
}
const code = generateCode('./index.js');
console.log(code);