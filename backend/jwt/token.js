import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
export const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
    // expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)  // 10 days expiry time
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,   // ✅ Needed for HTTPS (Render + Vercel)
    sameSite: "none",  // ✅ Needed for cross-origin cookies
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};