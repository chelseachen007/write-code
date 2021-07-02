new Promise((resolve, reject) => {
	console.log(1);
	resolve();
})
	.then(() => {
		console.log(2);
		new Promise((resolve, reject) => {
			console.log(4);
			resolve();
		})
			.then(() => {
				console.log(5);
			})
			.then(() => {
				console.log(6);
			});

		return new Promise((resolve, reject) => {
			console.log(7);
			resolve();
		})
			.then(() => {
				console.log(8);
			})
			.then(() => {
				console.log(9);
			});
	})
	.then(() => {
		console.log(3);
	});
