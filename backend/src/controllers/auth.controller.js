import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { env } from "../config/env.js";

export const register = async (req, res, next) => {
  try {
    if (!req.body) {
    return res.status(400).json({
        error: { code: "INVALID_INPUT", message: "Request body required" }
    });
    }

const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error: { code: "INVALID_INPUT", message: "Email and password required" }
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: { code: "USER_EXISTS", message: "User already exists" }
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash
    });

    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials" }
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials" }
      });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const accessToken = jwt.sign(
      { userId: user._id },
      env.jwtAccessSecret,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      env.jwtRefreshSecret,
      { expiresIn: "7d" }
    );

    res.json({
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error);
  }
};
