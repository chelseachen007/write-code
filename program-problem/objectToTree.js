//实现一个函数将对象结构转成在树形结构
// 原始 list 如下
let list = [
    { id: 1, name: '部门A', parentId: 0 },
    { id: 2, name: '部门B', parentId: 0 },
    { id: 3, name: '部门C', parentId: 1 },
    { id: 4, name: '部门D', parentId: 1 },
    { id: 5, name: '部门E', parentId: 2 },
    { id: 6, name: '部门F', parentId: 3 },
    { id: 7, name: '部门G', parentId: 2 },
    { id: 8, name: '部门H', parentId: 4 }
];

const result = convert(list)
function convert () {
    let res = []
    let temp = {}
    for (let i = 0; i < list.length; i++) {
        temp[list[i].id] = list[i]; // 以id作为索引存储元素，可以无需遍历直接定位元素
    }
    for (let j = 0; j < list.length; j++) {
        const item = list[j]
        const current = temp[item.id]
        if (item.parentId === 0) {
            res.push(current)
        } else {
            if (!temp[item.parentId]['children']) temp[item.parentId].children = []
            temp[item.parentId].children.push(item)
        }
    }
    return res
}