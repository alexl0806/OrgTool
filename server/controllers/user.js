//import packages
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js"; //make more users

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const alreadyUser = await User.findOne({ email });

    if (!alreadyUser)
      return res.status(404).send({ message: "User doesn't Exist" });

    const isPassValid = await bcrypt.compare(password, alreadyUser.password);

    if (!isPassValid)
      return res.status(400).send({ message: "Password Incorrect" });

    const token = jwt.sign(
      { email: alreadyUser.email, id: alreadyUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: alreadyUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { first, last, email, password, confirmPassword } = req.body;

  try {
    const alreadyUser = await User.findOne({ email });

    if (alreadyUser)
      return res.status(400).send({ message: "User already Exists" });

    if (password !== confirmPassword)
      return res.status(400).send({ message: "Passwords do not Match" });

    const hashedPass = await bcrypt.hash(password, 12);

    const result = new User({
      email,
      password: hashedPass,
      name: `${first} ${last}`,
    });

    await result.save();

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
