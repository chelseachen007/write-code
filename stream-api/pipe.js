async function* ints () {
    // 每 1000 毫秒生成一个递增的整数
    for (let i = 0; i < 5; ++i) {
        yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
    }
}
const integerStream = new ReadableStream({
    async start (controller) {
        for await (let chunk of ints()) {
            controller.enqueue(chunk);
        }
        controller.close();
    }
});
const doublingStream = new TransformStream({
    transform (chunk, controller) {
        controller.enqueue(chunk * 2);
    }
});
// 通过管道连接流
const pipedStream = integerStream.pipeThrough(doublingStream);
// 从连接流的输出获得读取器
const pipedStreamDefaultReader = pipedStream.getReader();
// pipeto用法
// 这里的管道连接操作隐式从 ReadableStream 获得了一个读取器，并把产生的值填充到 WritableStream。
// const writableStream = new WritableStream({
//     write (value) {
//         console.log(value);
//     }
// });
// const pipedStream = integerStream.pipeTo(writableStream);
// 消费者
(async function () {
    while (true) {
        const { done, value } = await pipedStreamDefaultReader.read();
        if (done) {
            break;
        } else {
            console.log(value);
        }
    }
})(); 