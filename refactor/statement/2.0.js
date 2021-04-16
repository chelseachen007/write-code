// 变量改名
function amountFor(perf, play) {
	let result = 0;
	switch (play.type) {
		case "tragedy":
			result = 40000;
			if (perf.audience > 30) {
				result += 1000 * (perf.audience - 30);
			}
			break;
		case "comedy":
			result = 30000;
			if (perf.audience > 20) {
				result += 10000 + 500 * (perf.audience - 20);
			}
			result += 300 * perf.audience;
			break;
		default:
			throw new Error(`unknown type: ${play.type}`);
	}
	return result;
}

// 函数参数改名
function amountFor(aPerformance, play) {
	let result = 0;
	switch (play.type) {
		case "tragedy":
			result = 40000;
			if (aPerformance.audience > 30) {
				result += 1000 * (aPerformance.audience - 30);
			}
			break;
		case "comedy":
			result = 30000;
			if (aPerformance.audience > 20) {
				result += 10000 + 500 * (aPerformance.audience - 20);
			}
			result += 300 * aPerformance.audience;
			break;
		default:
			throw new Error(`unknown type: ${play.type}`);
	}
	return result;
}
