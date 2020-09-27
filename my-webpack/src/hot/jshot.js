//js更新
import counter from "./counter";
import number from "./number";
counter();
number();

if (module.hot) {
  module.hot.accept("./number", function () {
    document.body.removeChild(document.getElementById("number"));
    number();
  });
}