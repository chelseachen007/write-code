//0.1+0.2==0.3
// function FixAdd (nums1, nums2) {
//     return (nums1 * 1000 + nums2 * 1000) / 1000
// }
// function FixAdd (nums1, nums2) {
//     return (nums1 + nums2).toFixed(1)
// }
// console.log(FixAdd(0.1, 0.2))
// 两个超大数字相加
const a = '9999999564416544444444444444442313216546423138468798798845546513215465453218476531321'
const b = '13245649841231687465154654987987987421231654654688746513235487454132184653412135468451215548541321'
function bigNumAdd (num1, num2) {
    let res = '', carry = 0
    num1 = `${num1}`.split('')
    num2 = `${num2}`.split('')
    while (num1.length || num2.length || carry) {
        carry = ~~num1.pop() + ~~num2.pop()
        res = (carry % 10) + res
        carry = carry > 9
    }
    return res
}
console.log(bigNumAdd(a, b))