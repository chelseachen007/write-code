var obj = {
    a: {
        b: {
            c: { f: "aa" }
        },
        d: {
            e: { g: "bb" },
            h: { i: "cc" }
        },
        j: {
            k: "dd"
        }
    }
}
//预期结果 [f,g,i,c,e,h,k,b,d,j,a]
const result = forMart(obj)

function Format (obj) {
    if (!obj) return []
    let res = []
    let queue = [obj]
    while (queue.length) {
        let arr = []
        let length = queue.length
        for (let i = 0; i < length; i++) {
            let curr = queue.shift()
            for (let s in curr) {
                if (typeof curr === 'object') {
                    queue.push(curr[s])
                    arr.push(s)
                }
            }
        }
        res = [...arr, ...res]
    }
    return res
}