// 滴滴面试题
// 组合排列，当时没写出来
// let arr = [1, 2, 3, 4, 5, 6, 15, 12, 4, 123]

// function find (nums, m) {
//     nums.sort((a, b) => a - b)
//     let res = []
//     let sum = 0
//     let map = {}
//     for (let i = nums.length; i > 0; i--) {
//         if (nums[i] > m) continue
//         res.push(nums[i])
//         sum += nums[i]
//         let left = i + 1
//         let right = nums.length

//         while (left < right) {

//         }
//     }

// }
// find(arr, 10)
// 保留Promiseall的能力拿到所有返回值
function myPromise (promiseList) {
    const origin = Promise.all()
    let res = []
    function myPromiseAll () {
        return new Promise((reslove, reject) => {
            Promise.all(promiseList).then(res => {
                if (res.length < promiseList.length) Promise.all(promiseList.slice(res.length))
            })
        })
    }

}
function isObject (obj) {
    let type = Object.prototype.toString.call(obj)
    return type.slice(8, type.length - 1) === 'object'
}
function format (string) {
    let res = ''
    for (let i = 0; i < string.length; i++) {
        res = string[i].charCodeAt() < 97 ? res + `_${string[i].toLowerCase()}` : res + string[i]
    }
    return res
}
console.log(format('stsdAsdaass'))
function JsonFormat (json, max) {
    for (let o in json) {
        if (typeof json[o] === 'object') {
            if (max > 0) JsonFormat(o, max--)
        } else {
            o = format(o)
        }
    }
    return json
}
const json = {
    stsdAsdaass: '1dasd',
    aBsdCsda: '112',
    deep: {
        stsdAsdaass: '1dasd',
        aBsdCsda: '112'
    }
}

console.log(JsonFormat(json, 1))