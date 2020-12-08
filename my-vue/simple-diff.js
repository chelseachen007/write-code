function patchNode (oldNode, newNode) {
    const oldChildren = oldNode.children
    const newChildren = newNode.children
    // 老的有子节点，新的没有就移除
    if (oldChildren.length && !newChildren.length) {
        // remove oldChildren
    }
    // 老的没有子节点，新的有 就 清空老节点并将新节点加入到DOM下
    else if (oldChildren.length && !newChildren.length) {
        // oldChildren =null 
        // Dom.append(newChildren)
    }
    // 都没有 就只做文本的替换
    else if (!oldChildren.length && !newChildren.length) {
        // 替换文本
    }
    else {
        update(oldChildren, newChildren)
    }

}
function someNode () {
    // 优先判断 key 是否相同
    // 异步组件 判断 asyncFactory  是否相同
    // 同步组件 判断input,data,isComment  是否相同
}
function update (oldNode, newNode) {
    let newStart
    let oldStart
    let oldEnd
    let newEnd
    // someNode 判断后 都进入 patchVnode
    //新头和旧头 
    if (newStart === oldStart) {
        newStart++
        oldStart++
    }
    //旧尾和新尾  
    else if (oldEnd === newEnd) {
        oldEnd--
        newEnd--
    }
    //旧头和新尾
    else if (oldStart === newEnd) {
        oldStart++
        newEnd--
    }
    //新头和旧尾
    else if (newStart === oldEnd) {
        newStart++
        oldEnd--
    }
    //都找不到 就遍历oldNode 生成一个 {key:index} 的Map
    let oldKeyToIdx = {}
    if (oldKeyToIdx[newStart.key]) {
        // move 这个节点到 oldStart 之前 然后继续遍历
    }
    // 如果找不到，或者 key 相同 但内容不相同
    else {
        //createElm创建一个新的DOM节点。
    }
    //循环完
    // 新的比老的长 addVnodes 多出来的节点
    // 老的比新的长 removeVnodes 多出来的节点

}