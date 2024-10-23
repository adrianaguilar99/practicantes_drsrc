import CryptoJS from 'crypto-js'; 

const SECRET_KEY = 'HRCIMFRONTSECRETKEY';

export function encryptData(data: string) {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decryptData(encryptedData: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}
