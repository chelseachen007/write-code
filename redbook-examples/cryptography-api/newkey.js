// 假设要生成一个满足如下条件的非对称密钥：
//  支持 ECDSA 算法；
//  使用 P-256 椭圆曲线；
//  可以从 CryptoKey 中提取；
//  可以跟 sign()和 verify()方法一起使用


(async function () {
    const params = {
        name: 'ECDSA',
        namedCurve: 'P-256'
    };
    const keyUsages = ['sign', 'verify'];
    const { publicKey, privateKey } = await crypto.subtle.generateKey(params, true,
        keyUsages);
    console.log(publicKey);
    // CryptoKey {type: "public", extractable: true, algorithm: {...}, usages: Array(1)}
    console.log(privateKey);
    // CryptoKey {type: "private", extractable: true, algorithm: {...}, usages: Array(1)}

})(); 