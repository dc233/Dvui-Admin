import CryptoJS from 'crypto-js';

const __CryptoSercet__ = 'P5]n0WNEzR|Q_xkY';

/**
 * 加密数据
 * @param data - 数据
 */
export function encrypto(data: any) {
    const newData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(newData, __CryptoSercet__).toString();
}

/**
 * 解密数据
 * @param cipherText - 密文
 */
export function decrypto(cipherText: string) {
    const bytes = CryptoJS.AES.decrypt(cipherText, __CryptoSercet__);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (originalText) {
        return JSON.parse(originalText);
    }
    return null;
}
