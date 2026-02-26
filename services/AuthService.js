const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { generateToken } = require("../utils/jwt");
const { SUCCESS_MESSAGE, FAILED_MESSAGE } = require("../constants/Constant");
const RegisterSchema = require("../models/RegisterSchema");

class AuthService {
  // 🔐 LOGIN
  static async login({ username, password }) {
    if (!username || !password) {
    return { success: false, message: "Username and password are required" };
  }
    const user = await RegisterSchema.findOne({
      where: { username }
    });
     console.log("user data", user);
    if (!user) {
      return { success: false, message: "Invalid credentials" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid credentials" };
    }

    const token = generateToken({ id: user.id, username: user.username });

    return {
      success: true,
      message: SUCCESS_MESSAGE.LOGIN_SUCCESS,
      data: { token, user },
    };
  }

  // 🔁 CHANGE PASSWORD
  static async changePassword(userId, oldPassword, newPassword) {
    const user = await RegisterSchema.findByPk(userId);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return { success: false, message: "Old password is incorrect" };
    }

    user.password = newPassword;
    await user.save();

    return {
      success: true,
      message: SUCCESS_MESSAGE.PASSWORD_CHANGED,
    };
  }

  // 📩 FORGOT PASSWORD
  static async forgotPassword(username) {
    const user = await RegisterSchema.findOne({ where: { username } });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.reset_token = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.reset_token_expiry = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    // 🔔 Send token via email/SMS (not implemented here)
    return {
      success: true,
      message: "Password reset token generated",
      data: { resetToken },
    };
  }

  // 🔄 RESET PASSWORD
  static async resetPassword(token, newPassword) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await RegisterSchema.findOne({
      where: {
        reset_token: hashedToken,
        reset_token_expiry: { [require("sequelize").Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return { success: false, message: "Invalid or expired token" };
    }

    user.password = newPassword;
    user.reset_token = null;
    user.reset_token_expiry = null;

    await user.save();

    return {
      success: true,
      message: SUCCESS_MESSAGE.PASSWORD_RESET,
    };
  }
}

module.exports = AuthService;
