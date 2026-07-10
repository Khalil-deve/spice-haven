import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  const secret = process.env.JWT_SECRET || "spice_haven_secret_key_fallback_2026";
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

export default generateToken;
