//import packages
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/user.js"; //make more users
import Token from "../models/resetToken.js";
import sendEmail from "../../client/src/utils/emailSend.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const alreadyUser = await User.findOne({ email });

    if (!alreadyUser) {
      return res.status(404).send({ message: "User Does Not Exist" });
    }

    const isPassValid = await bcrypt.compare(password, alreadyUser.password);

    if (!isPassValid) {
      return res.status(400).send({ message: "Password Incorrect" });
    }

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
      return res
        .status(400)
        .send({ message: "A User With That Email Already Exists" });

    if (password !== confirmPassword)
      return res.status(400).send({ message: "Passwords Do Not Match" });

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

export const resetPass = async (req, res) => {
  const email = req.body;

  try {
    const alreadyUser = await User.findOne({ email });

    if (!alreadyUser) {
      return res.status(404).send({ message: "User Does Not Exist" });
    }

    let token = await Token.findOne({ userId: user._id });

    if (token) {
      await token.deleteOne();
    }

    let newToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(newToken, 12);

    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `http://localhost:3000/passwordReset?token=${resetToken}&id=${user._id}`;
    sendEmail(user.email, "Password Reset Request", link);


  } catch (error) {
    res.status(500).json({ message: "Something went wrong"});
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id");

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { ...user, _id: id },
    {
      new: true,
    }
  );

  res.json(updatedUser);
};
