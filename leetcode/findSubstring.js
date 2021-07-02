let s = "lingmindraboofooowingdingbarrwingmonkeypoundcake";
let words = ["fooo", "barr", "wing", "ding", "wing"];
var findSubstring = function (s, words) {
	let wordLength = words[0].length;
	const result = [];
	let memo = new Map();
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		memo.set(word, (memo.get(word) || 0) + 1);
	}
	for (let i = 0; i < s.length; i++) {
		let map = new Map(memo);
		let wordCount = words.length;
		for (let j = i; j < s.length; j += wordLength) {
			const word = s.slice(j, j + wordLength);
			const count = map.get(word);
			if (!count) break;
			map.set(word, count - 1);
			wordCount--;
			if (wordCount === 0) {
				result.push(i);
				break;
			}
		}
	}
	return result;
};

console.log(findSubstring(s, words));
