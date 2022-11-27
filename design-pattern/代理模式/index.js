// 现在开始引入代理对象 proxyImage，通过这个代理对象，在图片被真正加载好之前，页面中将出现一张占位的菊花图 loading.gif, 来提示用户图片正在加载。
var myImage = (function () {
	var imgNode = document.createElement("img");
	document.body.appendChild(imgNode);
	return {
		setSrc: function (src) {
			imgNode.src = src;
		},
	};
})();
var proxyImage = (function () {
	var img = new Image();
	img.onload = function () {
		myImage.setSrc(this.src);
	};
	return {
		setSrc: function (src) {
			myImage.setSrc("file:// /C:/Users/svenzeng/Desktop/loading.gif");
			img.src = src;
		},
	};
})();
proxyImage.setSrc("http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg");
