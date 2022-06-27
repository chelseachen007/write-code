console.log("script start");

setTimeout(() => {
	console.log("setTimeout");
}, 1000);

Promise.resolve()
	.then(function () {
		console.log("promise1");
	})
	.then(function () {
		console.log("promise2");
	});

async function errorFunc() {
	try {
		await Promise.reject("error!!!");
	} catch (e) {
		console.log("error caught"); // 微1-3
	}
	console.log("errorFunc");
	return Promise.resolve("errorFunc success");
}
errorFunc().then((res) => console.log("errorFunc then res"));

console.log("script end");

// script start
//  script end
// promise1
// error caught
// errorFunc
// promise2
// errorFunc then res
// setTimeout
