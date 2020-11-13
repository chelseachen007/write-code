let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let gl = drawing.getContext("webgl");
  if (gl) {
    // 使用 WebGL
    // 准备使用 WebGL 上下文之前，通常需要先指定一种实心颜色清除 < canvas >。为此，要调用
    // clearColor()方法并传入 4 个参数，分别表示红、绿、蓝和透明度值。每个参数必须是 0~1 范围内的
    // 值，表示各个组件在最终颜色的强度。
    gl.clearColor(0, 0, 0, 1); // 黑色
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, drawing.width,
      drawing.height);

  }
} 