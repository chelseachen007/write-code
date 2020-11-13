async function* ints () {
    // 每 1000 毫秒生成一个递增的整数
    for (let i = 0; i < 5; ++i) {
        yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
    }
}
const readableStream = new ReadableStream({
    async start (controller) {
        for await (let chunk of ints()) {
            // 将值传入控制器
            controller.enqueue(chunk);
        }
        controller.close();
    }
});
console.log(readableStream.locked); // false
const readableStreamDefaultReader = readableStream.getReader();
console.log(readableStream.locked); // true
// 消费者
(async function () {
    while (true) {
        const { done, value } = await readableStreamDefaultReader.read();
        if (done) {
            break;
        } else {
            console.log(value);
        }
    }
})(); 