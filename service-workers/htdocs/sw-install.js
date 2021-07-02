// Service worker install code goes in here!
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/sw.js");
} else {
	console.log("不支持serviceWorker");
}
