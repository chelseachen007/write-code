(async function () {
    const textEncoder = new TextEncoder();
    const message = textEncoder.encode('foo');
    const messageDigest = await crypto.subtle.digest('SHA-256', message);
    console.log(new Uint32Array(messageDigest));
    //通常，在使用时，二进制的消息摘要会转换为十六进制字符串格式。通过将二进制数据按 8 位进行
    // 分割，然后再调用 toString(16)就可以把任何数组缓冲区转换为十六进制字符串
    const hexDigest = Array.from(new Uint8Array(messageDigest))
        .map((x) => x.toString(16).padStart(2, '0'))
        .join('');
    console.log(hexDigest);
    // 2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae
})(); 