// css 变更 热更新
import './index.css'
var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);

btn.onclick = function () {
  var div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
};