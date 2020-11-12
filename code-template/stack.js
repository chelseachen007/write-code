class Stack {
    constructor() {
        this.dataStore = []; //{2}
        this.top = 0;
    }
    //Stack方法
    push (item) {
        this.dataStore.push(item);
        this.top++;
    }
    pop () {
        this.top--;
        return this.dataStore.pop();
    }
    peek () {
        return this.dataStore[this.top - 1];
    }
    size () {
        return this.top;
    }
    clear () {
        this.dataStore = [];
    }
}