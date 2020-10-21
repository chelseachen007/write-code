let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  // 创建路径
  context.beginPath();
  // 绘制外圆
  context.arc(100, 100, 99, 0, 2 * Math.PI, false);
  // 绘制内圆
  context.moveTo(194, 100);
  context.arc(100, 100, 94, 0, 2 * Math.PI, false);
  // 移动原点到表盘中心
  context.translate(100, 100);
  // 旋转表针
  context.rotate(5);
  // 绘制分针
  context.moveTo(0, 0);
  context.lineTo(0, -85);
  // 绘制时针
  context.moveTo(0, 0);
  context.lineTo(-65, 0);
  // 正常
  // context.font = "bold 14px Arial";
  // context.textAlign = "center";
  // context.textBaseline = "middle";
  // context.fillText("12", 100, 15);
  // 与开头对齐
  // context.textAlign = "start";
  // context.fillText("12", 100, 40);
  // 与末尾对齐
  // context.textAlign = "end";
  // context.fillText("12", 100, 60);
  // 描画路径
  context.stroke();
} 