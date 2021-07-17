//import packages
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js"; //make more users

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const alreadyUser = await User.findOne( { email});

        if (!alreadyUser) return res.status(404).json({ message: "User doesn't Exist"});

        const isPassValid = await bcrypt.compare(password, alreadyUser.password);

        if (!isPassValid) return res.status(400).json({message: "Password Incorrect"});

        const token = jwt.sign({email: alreadyUser.email, id: alreadyUser._id}, 'test', { expiresIn: "1h"});

        res.status(200).json({result: alreadyUser, token});

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong'});
    }
}

export const signup = async (req, res) => {
    const { email, pass, confirmPass, first, last} = req.body;

    try {
        const alreadyUser = await User.findOne( { email});

        if (alreadyUser) return res.status(400).json({ message: "User already Exists"});

        if (pass != confirmPass) return res.status(400).json({message: "Passwords do not Match"});

        const hashedPass = await bcrypt.hash(pass, 12);

        const result = await User.create( {email, pass: hashedPass, name: `${first} ${last}` });

        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({result, token});

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong'});
    }

}
