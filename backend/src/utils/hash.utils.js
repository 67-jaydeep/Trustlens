import crypto from "crypto";

export const generateTextHash = (text) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};
