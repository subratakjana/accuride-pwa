/**
 *
 *
 * @param {string} getStr
 * @return {string | null}
 */
export const encode = (getStr) => {
    if (getStr) {
        const bufferObjEncode = Buffer.from(getStr, "utf8");
        const encodedString = bufferObjEncode.toString("base64");
        return encodedString;
    }
    return null;
};

/**
 *
 *
 * @param {string} getStr
 * @return {string | null}
 */
export const decode = (getStr) => {
    if (getStr) {
        const bufferObjDecode = Buffer.from(getStr, "base64");
        const decodedString = bufferObjDecode.toString("utf8");
        return decodedString;
    }
    return null;
};

export default {
    decode,
    encode,
};
