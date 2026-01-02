import crypto from "crypto";

export function generatePayFastSignature(data, passphrase = "") {
  const sortedKeys = Object.keys(data).sort();

  let paramString = sortedKeys
    .map((key) => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`)
    .join("&");

  if (passphrase) {
    paramString += `&passphrase=${encodeURIComponent(passphrase)}`;
  }

  return crypto.createHash("md5").update(paramString).digest("hex");
}
