import CryptoJS from "crypto-js";

// utility function to create signature for request
const createSign = (
  method: string,
  url: string,
  body: string,
  secret: string
) => {
  const stringToSign = `${method}${url}${body}${secret}`;
  return CryptoJS.MD5(stringToSign).toString();
};

export default createSign;
