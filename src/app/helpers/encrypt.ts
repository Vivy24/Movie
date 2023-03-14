import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

export const encryptData = (data: string) => {
  try {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      environment.encryptedSecretKey
    ).toString();
  } catch (e) {
    return undefined;
  }
};

export const decryptData = (data: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, environment.encryptedSecretKey);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {
    return undefined;
  }
};
