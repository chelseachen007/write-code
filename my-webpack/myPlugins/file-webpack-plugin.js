class fileWebpackPlugin {
  //   constructor(options) {
  //     console.log(options);
  //   }
  //如何钩入hooks
  apply (compiler) {
    compiler.hooks.emit.tapAsync("fileWebpackPlugin", (compilation, cb) => {
      const len = Object.keys(compilation.assets).length;
      let content = `文件的数量：${len}`;
      for (let filename in compilation.assets) {
        content += `\n ${filename}`;
      }
      compilation.assets[`file.txt`] = {
        source: function () {
          return content;
        },
        size: function () {
          return 1024;
        },
      };
      cb();
    });
  }
}

module.exports = fileWebpackPlugin;
