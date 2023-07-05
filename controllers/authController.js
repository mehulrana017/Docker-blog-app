import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashPassword,
    });
    res.status(201).json({
      success: true,
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Unable to signup at this time",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Incorrect Username or Password",
      });
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Unable to signup at this time",
    });
  }
};
