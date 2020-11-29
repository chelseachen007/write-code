export class Queue {
    constructor(size) {
        this.size = size
        this.list = [];
    }
    //向队列中添加数据
    push (data) {
        if (data == null) return false;

        //如果传递了size参数就设置了队列的大小
        if (this.size != null && !isNaN(this.size)) {
            if (this.list.length == this.size) this.pop();
        }
        this.list.unshift(data);
        return true;
    }

    //从队列中取出数据
    pop () {
        return this.list.pop();
    }

    //返回队列的大小
    size () {
        return this.list.length;
    }

    //返回队列的内容
    quere () {
        return this.list;
    }
}