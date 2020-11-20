function fun1 () {
    console.log('1->begin')
    error
    console.log('1->end')
}
setTimeout(() => {
    try {
        // setTimeout(() => {
        fun1()
        // }, 100)
    } catch (e) {
        console.log('catch', e)
    }
})

