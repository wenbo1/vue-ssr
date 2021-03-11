import md5 from 'js-md5';

/**
 * 生成随机串
 * @param {Number} len 长度
 */
export const generateNonceStr = (len = 16) => {
    const keyChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let strArr = [];
    for (let i = 0; i < len; i += 1) {
        strArr.push(keyChars[Math.floor(Math.random() * 62)]);
    }
    return strArr.join('');
};

/**
 * 获取临时用户唯一key
 */
export const getUserUniqueKey = () => {
    let ukey = localStorage.getItem('userUniqueKey') || false;
    if (ukey == false) {
        ukey = md5(generateNonceStr() + getTimestamp()).toLocaleLowerCase();
        localStorage.setItem('userUniqueKey', ukey);
    }
    return ukey;
};

/**
 * 获取当前时间戳
 * @returns {BigInteger}
 */
export const getTimestamp = () => {
    return new Date().getTime() / 1000;
};
