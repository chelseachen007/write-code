class txtwebpackPlugin {
  //   constructor(options) {
  //     console.log(options);
  //   }
  //如何钩入hooks
  apply(compiler) {
    compiler.hooks.emit.tapAsync("txtwebpackPlugin", (compilation, cb) => {
      compilation.assets["test.txt"] = {
        source: function () {
          return "hello webpack第四节课";
        },
        size: function () {
          return 1024;
        },
      };
      cb();
    });
    compiler.hooks.compile.tap("txtwebpackPlugin", (compilation) => {
      console.log("hello compiler hook");
    });
  }
}

module.exports = txtwebpackPlugin;
