async function* ints () {
    // 每 1000 毫秒生成一个递增的整数
    for (let i = 0; i < 5; ++i) {
        yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
    }
}
const writableStream = new WritableStream({
    write (value) {
        console.log(value);
    }
});
console.log(writableStream.locked); // false
const writableStreamDefaultWriter = writableStream.getWriter();
console.log(writableStream.locked); // true
// 生产者
(async function () {
    for await (let chunk of ints()) {
        await writableStreamDefaultWriter.ready;
        writableStreamDefaultWriter.write(chunk);
    }
    writableStreamDefaultWriter.close();
})(); 