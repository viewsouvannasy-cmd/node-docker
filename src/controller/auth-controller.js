import { user } from "../models/userModel.js";
import bcrypt from "bcrypt";

const siupUp = async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    const hashPassword = await bcrypt.hash(user_password, 10);

    const newUser = await user.create({
      username: user_name,
      password: hashPassword,
    });
    req.session.user = newUser;
    res.status(200).json({ ok: true, results: newUser });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Internal server errror" });
  }
};

const login = async (req, res) => {
  try {
    const { user_name, user_password } = req.body;

    const findUser = await user.findOne({ username: user_name });
    if (!findUser) {
      return res.status(400).json({ ok: false, results: "user not found" });
    }

    const isCorrect = await bcrypt.compare(user_password, findUser.password);

    if (!isCorrect) {
      return res
        .status(401)
        .json({ ok: false, results: "password is incorrect" });
    }
    req.session.user = findUser;
    res.status(200).json({ ok: true, results: "login successfully" });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Internal server errror" });
  }
};

export { siupUp, login };
