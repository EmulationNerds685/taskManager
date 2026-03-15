import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";

// AES_SECRET must be 64 hex characters (32 bytes)
// AES_IV must be 32 hex characters (16 bytes)
// Generate them with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
//                     node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"

const getKey = () => Buffer.from(process.env.AES_SECRET, "hex");
const getIV  = () => Buffer.from(process.env.AES_IV, "hex");

export const encrypt = (data) => {
  const text = typeof data === "object" ? JSON.stringify(data) : String(data);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), getIV());
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  return encrypted.toString("hex");
};

export const decrypt = (encryptedHex) => {
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), getIV());
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]);
  const text = decrypted.toString("utf8");
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};