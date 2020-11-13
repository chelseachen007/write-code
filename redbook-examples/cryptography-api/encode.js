// SubtleCrypto 对象支持使用公钥和对称算法加密和解密消息。这两种操作分别通过 SubtleCrypto.
// encrypt()和 SubtleCrypto.decrypt()方法完成。
(async function () {
    const algoIdentifier = 'AES-CBC';
    const keyParams = {
        name: algoIdentifier,
        length: 256
    };
    const keyUsages = ['encrypt', 'decrypt'];
    const key = await crypto.subtle.generateKey(keyParams, true,
        keyUsages);
    const originalPlaintext = (new TextEncoder()).encode('I am Satoshi Nakamoto');
    const encryptDecryptParams = {
        name: algoIdentifier,
        iv: crypto.getRandomValues(new Uint8Array(16))
    };
    const ciphertext = await crypto.subtle.encrypt(encryptDecryptParams, key,
        originalPlaintext);
    console.log(ciphertext);
    // ArrayBuffer(32) {}
    const decryptedPlaintext = await crypto.subtle.decrypt(encryptDecryptParams, key,
        ciphertext);
    console.log((new TextDecoder()).decode(decryptedPlaintext));
    // I am Satoshi Nakamoto
})(); 