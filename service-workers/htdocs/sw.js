// Service worker code goes in here!
var cacheVersion = "v1",
	cacheAssets = [
		"/css/global.css",
		"/js/debounce.js",
		"/js/nav.js",
		"/js/attach-nav.js",
		"/img/global/icon-email.svg",
		"/img/global/icon-github.svg",
		"/img/global/icon-linked-in.svg",
		"/img/global/icon-twitter.svg",
		"/img/global/jeremy.svg",
	];

/*   
     首先，在cacheVersion字符串中定义缓存标识符，可以为缓存指定一个名称，
     并且可以在将来版本的Service Worker中更改缓存时对其进行更新。
     然后，在cachedAssets数组中指定要在Service Worker中预先缓存的资源。 
*/
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(cacheVersion)
			.then((cache) => {
				return cache.addAll(cacheAssets);
			})
			.then(() => {
				return self.skipWaiting();
			})
	);
});

self.addEventListener("activate", (event) => {
	return self.clients.claim();
});

//通过这段代码，可以从缓存中获取已在Service Worker的install事件代码中准备好的资源。
// 如果遇到不在缓存中的资源请求，可以使用fetch方法（第8章）从网络中检索。
// 下载资源后，将其放置在Service Worker中。后续的请求将从缓存中（而不是从网络）检索资源。
// 使用Ctrl+Shift+R（或Mac上的Cmd+Shift+R）强制重新加载页面，所做的更改即可生效。
self.addEventListener("fetch", (event) => {
	const allowedHosts =
			/(localhost|fonts\.googleapis\.com|fonts\.gstatic\.com)/i,
		deniedAssets = /(sw\.js|sw-install\.js)$/i;
	if (
		allowedHosts.test(event.request.url) &&
		!deniedAssets.test(event.request.url)
	) {
		event.respondWith(
			caches.match(event.request).then(
				(cacheRes) =>
					cacheRes ||
					fetch(event.request).then((fetchRes) => {
						caches.open(cacheVersion).then((cache) => {
							cache.put(event.request, fetchRes.clone());
						});
						return fetchRes();
					})
			)
		);
	}
	return self.clients.claim();
});
