/**
 * 工具类
 */
import Vue from 'vue'
import CryptoJS from 'crypto-js/crypto-js'
export default {
    encrypt(str) {
        var IV = 'hCFSRGRI7DxOCWNP';
        var KEY = '6oH2h6areXFdBW0Q';
        // var data = 'ABCDEFGH';
        var key = CryptoJS.enc.Utf8.parse(KEY);
        var iv = CryptoJS.enc.Utf8.parse(IV);
        var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    },
    //解密
    decrypt(str) {
        var IV = 'hCFSRGRI7DxOCWNP';
        var KEY = '6oH2h6areXFdBW0Q';
        // var data = 'ABCDEFGH';
        var key = CryptoJS.enc.Utf8.parse(KEY);
        var iv = CryptoJS.enc.Utf8.parse(IV);
        var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

}