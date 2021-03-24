let S = 'abbb'
let C = 'a'
/**
 * @param {string} S
 * @param {character} C
 * @return {number[]}
 */
var shortestToChar = function (S, C) {
    let res = []
    for (let i = 0; i < S.length; i++) {
        if (S[i] === C) {
            res.push(0)
            continue
        }
        let l = i; r = i; short = Infinity
        while (l >= 0) {
            if (S[l] === C) {
                short = i - l
                break
            }
            l--
        }
        console.log(short)
        while (r < S.length) {
            if (S[r] === C) {
                short = Math.min(short, r - i)
                break
            }
            r++
        }
        res.push(short)
    }
    return res
};
shortestToChar(S, C)