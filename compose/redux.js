function f1 (arg) {
    console.log("f1", arg);
    return arg;
}
function f2 (arg) {
    console.log("f2", arg);
    return arg;
}
function f3 (arg) {
    console.log("f3", ...arguments);
    return arg;
}

const res = f1(f2(f3("omg")));
console.log("res", res); //sy-log
// f3 omg
// f2 omg
// f1 omg
// res omg

//


compose(f1, f2, f3)('omg', '123')


function compose () {
    const fn = [...arguments]
    if (fn.length <= 1) arg => arg
    return fn.reduce((a, b) => (...arg) => a(b(...arg)))
}
