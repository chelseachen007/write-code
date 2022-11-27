//同样，我们把每种获取 upload 对象的方法都封装在各自的函数里，然后使用一个迭代器，迭代获取这些 upload 对象，直到获取到一个可用的为止：
var getActiveUploadObj = function () {
	try {
		return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
	} catch (e) {
		return false;
	}
};
var getFlashUploadObj = function () {
	if (supportFlash()) {
		// supportFlash 函数未提供
		var str = '<object type="application/x-shockwave-flash"></object>';
		return $(str).appendTo($("body"));
	}
	return false;
};
var getFormUpladObj = function () {
	var str = '<input name="file" type="file" class="ui-file"/>'; // 表单上传
	return $(str).appendTo($("body"));
};
var iteratorUploadObj = function () {
	for (var i = 0, fn; (fn = arguments[i++]); ) {
		var uploadObj = fn();
		if (uploadObj !== false) {
			return uploadObj;
		}
	}
};
// 如果有向下兼容的，只需要向后加方法就好了‘
var uploadObj = iteratorUploadObj(
	getActiveUploadObj,
	getFlashUploadObj,
	getFormUpladObj
);
